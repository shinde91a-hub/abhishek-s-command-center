import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, Loader2, Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hi! I'm Abhishek's AI assistant. Ask me about his experience, skills, or operating principles. You can also use the mic to speak!" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [autoSpeak, setAutoSpeak] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const speakText = useCallback(async (text: string) => {
    if (!autoSpeak) return;

    try {
      setIsSpeaking(true);

      // Stop any currently playing audio
      if (currentAudioRef.current) {
        currentAudioRef.current.pause();
        currentAudioRef.current = null;
      }

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/elevenlabs-tts`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ text }),
        }
      );

      if (!response.ok) {
        throw new Error(`TTS failed: ${response.status}`);
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      currentAudioRef.current = audio;

      audio.onended = () => {
        setIsSpeaking(false);
        currentAudioRef.current = null;
        URL.revokeObjectURL(audioUrl);
      };

      audio.onerror = () => {
        setIsSpeaking(false);
        currentAudioRef.current = null;
        URL.revokeObjectURL(audioUrl);
      };

      await audio.play();
    } catch (error) {
      console.error('TTS error:', error);
      setIsSpeaking(false);
    }
  }, [autoSpeak]);

  const stopSpeaking = useCallback(() => {
    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current = null;
    }
    setIsSpeaking(false);
  }, []);

  const sendMessage = async (messageText?: string) => {
    const text = messageText || input.trim();
    if (!text || isLoading) return;

    if (!messageText) setInput('');
    setMessages(prev => [...prev, { role: 'user', content: text }]);
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('portfolio-chat', {
        body: { message: text }
      });

      if (error) throw error;

      if (data?.error) {
        toast({ title: "Error", description: data.error, variant: "destructive" });
        return;
      }

      const reply = data.reply;
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);

      // Auto-speak the response
      if (autoSpeak) {
        speakText(reply);
      }
    } catch (error) {
      console.error('Chat error:', error);
      toast({ title: "Error", description: "Failed to get response. Please try again.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        stream.getTracks().forEach(track => track.stop());
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });

        if (audioBlob.size < 1000) {
          toast({ title: "Too short", description: "Please speak a bit longer.", variant: "destructive" });
          return;
        }

        // Transcribe the audio
        try {
          setIsLoading(true);
          const formData = new FormData();
          formData.append('audio', audioBlob, 'recording.webm');

          const response = await fetch(
            `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/elevenlabs-transcribe`,
            {
              method: 'POST',
              headers: {
                apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
                Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
              },
              body: formData,
            }
          );

          if (!response.ok) throw new Error('Transcription failed');

          const data = await response.json();
          if (data.text && data.text.trim()) {
            sendMessage(data.text.trim());
          } else {
            toast({ title: "No speech detected", description: "Please try again.", variant: "destructive" });
            setIsLoading(false);
          }
        } catch (error) {
          console.error('Transcription error:', error);
          toast({ title: "Error", description: "Failed to transcribe audio.", variant: "destructive" });
          setIsLoading(false);
        }
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Microphone error:', error);
      toast({ title: "Microphone Access Required", description: "Please enable microphone access to use voice features.", variant: "destructive" });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: 'spring' }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 right-4 z-50 p-3 bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-orange transition-all duration-300 hover:scale-105"
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? <X className="w-5 h-5" /> : <MessageCircle className="w-5 h-5" />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed top-16 right-4 z-40 w-80 sm:w-96 h-[450px] glass-card rounded-xl overflow-hidden flex flex-col shadow-xl"
          >
            {/* Header */}
            <div className="bg-primary text-primary-foreground px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5" />
                <div>
                  <h3 className="font-semibold text-sm">Ask about Abhishek</h3>
                  <p className="text-xs opacity-80">Voice-enabled AI assistant</p>
                </div>
              </div>
              <button
                onClick={() => {
                  if (isSpeaking) stopSpeaking();
                  setAutoSpeak(!autoSpeak);
                }}
                className="p-1.5 rounded-lg hover:bg-primary-foreground/20 transition-colors"
                aria-label={autoSpeak ? "Mute voice" : "Enable voice"}
                title={autoSpeak ? "Voice responses ON" : "Voice responses OFF"}
              >
                {autoSpeak ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-3 space-y-3">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.role === 'user' ? 'bg-accent' : 'bg-primary/10'
                  }`}>
                    {message.role === 'user' ? (
                      <User className="w-4 h-4 text-foreground" />
                    ) : (
                      <Bot className="w-4 h-4 text-primary" />
                    )}
                  </div>
                  <div className={`max-w-[75%] px-3 py-2 rounded-xl text-sm ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-accent text-foreground'
                  }`}>
                    {message.content}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-2"
                >
                  <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-primary" />
                  </div>
                  <div className="px-3 py-2 rounded-xl bg-accent">
                    <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t border-border">
              {/* Recording indicator */}
              {isRecording && (
                <div className="flex items-center gap-2 mb-2 px-2">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-xs text-muted-foreground">Listening... tap mic to stop</span>
                </div>
              )}
              {isSpeaking && (
                <div className="flex items-center gap-2 mb-2 px-2">
                  <Volume2 className="w-3 h-3 text-primary animate-pulse" />
                  <span className="text-xs text-muted-foreground">Speaking...</span>
                </div>
              )}
              <div className="flex gap-2">
                <button
                  onClick={isRecording ? stopRecording : startRecording}
                  disabled={isLoading}
                  className={`p-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                    isRecording
                      ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90'
                      : 'bg-accent text-foreground hover:bg-accent/80'
                  }`}
                  aria-label={isRecording ? "Stop recording" : "Start recording"}
                >
                  {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </button>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask a question..."
                  disabled={isLoading || isRecording}
                  className="flex-1 px-3 py-2 text-sm rounded-lg bg-accent border-none focus:outline-none focus:ring-2 focus:ring-primary text-foreground placeholder:text-muted-foreground"
                />
                <button
                  onClick={() => sendMessage()}
                  disabled={!input.trim() || isLoading || isRecording}
                  className="p-2 bg-primary text-primary-foreground rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatbot;
