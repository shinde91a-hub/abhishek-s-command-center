import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, Loader2, Mic, MicOff, Volume2, VolumeX, Sparkles, ChevronDown } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const SUGGESTED_QUESTIONS = [
  "What's Abhishek's expertise?",
  "Tell me about his key achievements",
  "What are his operating principles?",
];

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
  const [showNudge, setShowNudge] = useState(true);
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

  // Hide nudge after 6 seconds or when opened
  useEffect(() => {
    const timer = setTimeout(() => setShowNudge(false), 6000);
    return () => clearTimeout(timer);
  }, []);

  const handleOpen = () => {
    setIsOpen(true);
    setShowNudge(false);
  };

  const speakText = useCallback(async (text: string) => {
    if (!autoSpeak) return;
    try {
      setIsSpeaking(true);
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
      if (!response.ok) throw new Error(`TTS failed: ${response.status}`);
      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      currentAudioRef.current = audio;
      audio.onended = () => { setIsSpeaking(false); currentAudioRef.current = null; URL.revokeObjectURL(audioUrl); };
      audio.onerror = () => { setIsSpeaking(false); currentAudioRef.current = null; URL.revokeObjectURL(audioUrl); };
      await audio.play();
    } catch (error) {
      console.error('TTS error:', error);
      setIsSpeaking(false);
    }
  }, [autoSpeak]);

  const stopSpeaking = useCallback(() => {
    if (currentAudioRef.current) { currentAudioRef.current.pause(); currentAudioRef.current = null; }
    setIsSpeaking(false);
  }, []);

  const sendMessage = async (messageText?: string) => {
    const text = messageText || input.trim();
    if (!text || isLoading) return;
    if (!messageText) setInput('');
    setMessages(prev => [...prev, { role: 'user', content: text }]);
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('portfolio-chat', { body: { message: text } });
      if (error) throw error;
      if (data?.error) { toast({ title: "Error", description: data.error, variant: "destructive" }); return; }
      const reply = data.reply;
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
      if (autoSpeak) speakText(reply);
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
      mediaRecorder.ondataavailable = (event) => { if (event.data.size > 0) audioChunksRef.current.push(event.data); };
      mediaRecorder.onstop = async () => {
        stream.getTracks().forEach(track => track.stop());
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        if (audioBlob.size < 1000) { toast({ title: "Too short", description: "Please speak a bit longer.", variant: "destructive" }); return; }
        try {
          setIsLoading(true);
          const formData = new FormData();
          formData.append('audio', audioBlob, 'recording.webm');
          const response = await fetch(
            `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/elevenlabs-transcribe`,
            { method: 'POST', headers: { apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY, Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}` }, body: formData }
          );
          if (!response.ok) throw new Error('Transcription failed');
          const data = await response.json();
          if (data.text && data.text.trim()) { sendMessage(data.text.trim()); }
          else { toast({ title: "No speech detected", description: "Please try again.", variant: "destructive" }); setIsLoading(false); }
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
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  const hasOnlyWelcome = messages.length === 1;

  return (
    <>
      {/* Nudge tooltip */}
      <AnimatePresence>
        {showNudge && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 pointer-events-none sm:left-auto sm:right-6 sm:translate-x-0 sm:bottom-28"
          >
            <div className="bg-foreground text-background text-xs font-medium px-4 py-2 rounded-full shadow-lg whitespace-nowrap flex items-center gap-2">
              <Sparkles className="w-3 h-3 text-primary" />
              Ask me anything about Abhishek!
              <ChevronDown className="w-3 h-3" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Prominent FAB — centered on mobile, bottom-right on desktop */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ delay: 0.5, type: 'spring', stiffness: 260, damping: 20 }}
            onClick={handleOpen}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 sm:left-auto sm:right-6 sm:translate-x-0 z-50 flex items-center gap-3 px-5 py-3.5 bg-primary text-primary-foreground rounded-full shadow-[0_8px_32px_-8px_hsl(30_100%_50%/0.6)] hover:shadow-[0_12px_40px_-8px_hsl(30_100%_50%/0.8)] hover:scale-105 active:scale-95 transition-all duration-300"
            aria-label="Open chat"
          >
            {/* Pulse ring */}
            <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-20" />
            <Bot className="w-5 h-5 flex-shrink-0" />
            <span className="font-semibold text-sm tracking-wide">Ask AI about Abhishek</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ type: 'spring', damping: 26, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 sm:bottom-6 sm:left-auto sm:right-6 sm:w-[400px] flex flex-col"
            style={{ maxHeight: 'calc(100dvh - 1rem)' }}
          >
            <div className="flex flex-col bg-background border border-border rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-hidden h-[90dvh] sm:h-[520px]">
              {/* Header */}
              <div className="bg-primary text-primary-foreground px-4 py-3.5 flex items-center justify-between flex-shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm leading-tight">Ask about Abhishek</h3>
                    <p className="text-xs opacity-75 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-foreground/60 inline-block" />
                      Voice-enabled AI assistant
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => { if (isSpeaking) stopSpeaking(); setAutoSpeak(!autoSpeak); }}
                    className="p-2 rounded-full hover:bg-primary-foreground/20 transition-colors"
                    aria-label={autoSpeak ? "Mute voice" : "Enable voice"}
                    title={autoSpeak ? "Voice responses ON" : "Voice responses OFF"}
                  >
                    {autoSpeak ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                  </button>
                  <button onClick={() => setIsOpen(false)} className="p-2 rounded-full hover:bg-primary-foreground/20 transition-colors" aria-label="Close chat">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-2.5 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${message.role === 'user' ? 'bg-primary' : 'bg-accent'}`}>
                      {message.role === 'user' ? (
                        <User className="w-4 h-4 text-primary-foreground" />
                      ) : (
                        <Bot className="w-4 h-4 text-primary" />
                      )}
                    </div>
                    <div className={`max-w-[78%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground rounded-tr-sm'
                        : 'bg-accent text-foreground rounded-tl-sm'
                    }`}>
                      {message.content}
                    </div>
                  </motion.div>
                ))}

                {/* Suggested questions — only on welcome screen */}
                {hasOnlyWelcome && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="space-y-2 pt-1"
                  >
                    <p className="text-xs text-muted-foreground px-1">Try asking:</p>
                    {SUGGESTED_QUESTIONS.map((q) => (
                      <button
                        key={q}
                        onClick={() => sendMessage(q)}
                        className="w-full text-left text-xs px-3.5 py-2.5 rounded-xl border border-border bg-background hover:bg-accent hover:border-primary/30 transition-all duration-200 text-foreground"
                      >
                        {q}
                      </button>
                    ))}
                  </motion.div>
                )}

                {isLoading && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                      <Bot className="w-4 h-4 text-primary" />
                    </div>
                    <div className="px-4 py-3 rounded-2xl rounded-tl-sm bg-accent flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-3 border-t border-border bg-background flex-shrink-0">
                {isRecording && (
                  <div className="flex items-center gap-2 mb-2 px-1">
                    <span className="w-2 h-2 rounded-full bg-destructive animate-pulse" />
                    <span className="text-xs text-muted-foreground">Listening… tap mic to stop</span>
                  </div>
                )}
                {isSpeaking && (
                  <div className="flex items-center gap-2 mb-2 px-1">
                    <Volume2 className="w-3 h-3 text-primary animate-pulse" />
                    <span className="text-xs text-muted-foreground">Speaking…</span>
                  </div>
                )}
                <div className="flex gap-2 items-center">
                  <button
                    onClick={isRecording ? stopRecording : startRecording}
                    disabled={isLoading}
                    className={`p-2.5 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0 ${
                      isRecording ? 'bg-destructive text-destructive-foreground' : 'bg-accent text-foreground hover:bg-accent/80'
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
                    placeholder="Ask anything about Abhishek…"
                    disabled={isLoading || isRecording}
                    className="flex-1 px-3.5 py-2.5 text-sm rounded-xl bg-accent border border-transparent focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-foreground placeholder:text-muted-foreground disabled:opacity-50"
                  />
                  <button
                    onClick={() => sendMessage()}
                    disabled={!input.trim() || isLoading || isRecording}
                    className="p-2.5 bg-primary text-primary-foreground rounded-xl disabled:opacity-40 disabled:cursor-not-allowed hover:bg-primary/90 active:scale-95 transition-all flex-shrink-0"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatbot;
