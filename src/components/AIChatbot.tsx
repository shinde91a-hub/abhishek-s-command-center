import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Bot, User, Loader2, Mic, MicOff, Volume2, VolumeX, Sparkles } from 'lucide-react';
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

// Lissajous-style flowing wave orb — inspired by the reference image but in orange
const WaveOrb = ({ isActive, isSpeaking, size = 120 }: { isActive: boolean; isSpeaking: boolean; size?: number }) => {
  const cx = size / 2;
  const cy = size / 2;
  const r = size * 0.38;

  // Generate lissajous-style wave path
  const buildPath = (phaseOffset: number, radiusScale: number) => {
    const steps = 200;
    const points: string[] = [];
    for (let i = 0; i <= steps; i++) {
      const t = (i / steps) * Math.PI * 2;
      const x = cx + r * radiusScale * Math.sin(2 * t + phaseOffset) * Math.cos(t * 0.7);
      const y = cy + r * radiusScale * Math.cos(3 * t + phaseOffset) * Math.sin(t * 0.5 + 0.3);
      points.push(i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`);
    }
    return points.join(' ') + ' Z';
  };

  const waves = [
    { phase: 0,    rs: 1.0,  opacity: 0.9, delay: 0 },
    { phase: 0.6,  rs: 0.88, opacity: 0.7, delay: 0.2 },
    { phase: 1.2,  rs: 0.76, opacity: 0.55, delay: 0.4 },
    { phase: 1.8,  rs: 0.64, opacity: 0.4, delay: 0.6 },
    { phase: 2.4,  rs: 0.52, opacity: 0.3, delay: 0.8 },
  ];

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      {/* Soft radial glow behind */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: 'radial-gradient(circle, hsl(30 100% 50% / 0.18) 0%, hsl(30 100% 50% / 0.06) 60%, transparent 80%)',
        }}
      />

      {/* Active pulse ring */}
      {(isActive || isSpeaking) && (
        <>
          <motion.div
            className="absolute rounded-full border border-primary/40"
            animate={{ scale: [1, 1.6], opacity: [0.7, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeOut' }}
            style={{ width: size * 0.67, height: size * 0.67 }}
          />
          <motion.div
            className="absolute rounded-full border border-primary/25"
            animate={{ scale: [1, 2], opacity: [0.5, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeOut', delay: 0.35 }}
            style={{ width: size * 0.67, height: size * 0.67 }}
          />
        </>
      )}

      {/* Rotating SVG wave lines */}
      <motion.svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="absolute"
        animate={{ rotate: 360 }}
        transition={{ duration: isActive || isSpeaking ? 4 : 9, repeat: Infinity, ease: 'linear' }}
      >
        <defs>
          <radialGradient id="orbGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(35 100% 60%)" stopOpacity="1" />
            <stop offset="100%" stopColor="hsl(25 100% 45%)" stopOpacity="0.6" />
          </radialGradient>
        </defs>
        {waves.map((w, i) => (
          <motion.path
            key={i}
            d={buildPath(w.phase, w.rs)}
            fill="none"
            stroke="url(#orbGrad)"
            strokeWidth={size * 0.012}
            strokeOpacity={w.opacity}
            animate={{
              d: [buildPath(w.phase, w.rs), buildPath(w.phase + 0.5, w.rs * 0.95), buildPath(w.phase, w.rs)],
              strokeOpacity: isActive || isSpeaking ? [w.opacity, w.opacity * 1.4, w.opacity] : [w.opacity, w.opacity * 0.7, w.opacity],
            }}
            transition={{
              duration: isActive || isSpeaking ? 1.2 : 3.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: w.delay,
            }}
          />
        ))}
      </motion.svg>

      {/* Counter-rotate second layer for depth */}
      <motion.svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="absolute"
        animate={{ rotate: -360 }}
        transition={{ duration: isActive || isSpeaking ? 6 : 14, repeat: Infinity, ease: 'linear' }}
      >
        {waves.slice(0, 3).map((w, i) => (
          <motion.path
            key={i}
            d={buildPath(w.phase + Math.PI, w.rs * 0.7)}
            fill="none"
            stroke="hsl(30 100% 65%)"
            strokeWidth={size * 0.008}
            strokeOpacity={w.opacity * 0.5}
            animate={{
              d: [buildPath(w.phase + Math.PI, w.rs * 0.7), buildPath(w.phase + Math.PI + 0.4, w.rs * 0.65), buildPath(w.phase + Math.PI, w.rs * 0.7)],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: w.delay + 0.3 }}
          />
        ))}
      </motion.svg>

    </div>
  );
};

// Keep alias for backward compat
const OrbRings = ({ isActive, isSpeaking }: { isActive: boolean; isSpeaking: boolean }) => (
  <WaveOrb isActive={isActive} isSpeaking={isSpeaking} size={120} />
);

// Voice bars (ChatGPT-style)
const VoiceBars = ({ active }: { active: boolean }) => (
  <div className="flex items-center gap-1 h-6">
    {[0.3, 0.6, 1, 0.7, 0.4, 0.8, 0.5].map((h, i) => (
      <motion.div
        key={i}
        className="w-1 rounded-full bg-primary"
        animate={active ? { scaleY: [h, 1, h * 0.5, 0.9, h] } : { scaleY: 0.3 }}
        transition={active ? { duration: 0.8, repeat: Infinity, delay: i * 0.1, ease: 'easeInOut' } : { duration: 0.3 }}
        style={{ height: '100%', originY: 'center' }}
      />
    ))}
  </div>
);

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

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const speakText = useCallback(async (text: string) => {
    if (!autoSpeak) return;
    try {
      setIsSpeaking(true);
      if (currentAudioRef.current) { currentAudioRef.current.pause(); currentAudioRef.current = null; }
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/elevenlabs-tts`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY, Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}` },
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
      mediaRecorder.ondataavailable = (e) => { if (e.data.size > 0) audioChunksRef.current.push(e.data); };
      mediaRecorder.onstop = async () => {
        stream.getTracks().forEach(t => t.stop());
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
          if (data.text?.trim()) sendMessage(data.text.trim());
          else { toast({ title: "No speech detected", description: "Please try again.", variant: "destructive" }); setIsLoading(false); }
        } catch {
          toast({ title: "Error", description: "Failed to transcribe audio.", variant: "destructive" });
          setIsLoading(false);
        }
      };
      mediaRecorder.start();
      setIsRecording(true);
    } catch {
      toast({ title: "Microphone Access Required", description: "Please enable microphone access to use voice features.", variant: "destructive" });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current?.state === 'recording') { mediaRecorderRef.current.stop(); setIsRecording(false); }
  };

  const hasOnlyWelcome = messages.length === 1;

  return (
    <>
      {/* ── Hero Orb Entry Point ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.6, ease: 'easeOut' }}
        className="flex flex-col items-center gap-2 mb-6"
      >
        {/* Label above orb */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground"
        >
          <Sparkles className="w-3 h-3 text-primary" />
          AI-powered — ask me anything
        </motion.div>

        {/* Wave orb — larger in hero */}
        <div onClick={() => setIsOpen(true)} className="cursor-pointer">
          <WaveOrb isActive={false} isSpeaking={false} size={140} />
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-xs text-muted-foreground"
        >
          Tap to chat with Abhishek's AI
        </motion.p>
      </motion.div>

      {/* ── Full-screen Chat Modal ── */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
            />

            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, y: 60, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 60, scale: 0.96 }}
              transition={{ type: 'spring', damping: 28, stiffness: 320 }}
              className="fixed bottom-0 left-0 right-0 z-50 sm:bottom-6 sm:left-1/2 sm:-translate-x-1/2 sm:w-[480px]"
              style={{ maxHeight: 'calc(100dvh - 1.5rem)' }}
            >
              <div className="flex flex-col bg-background border border-border rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden h-[92dvh] sm:h-[600px]">

                {/* ── Header – Orb style ── */}
                <div className="relative flex flex-col items-center pt-6 pb-4 px-4 border-b border-border bg-gradient-to-b from-accent/60 to-background flex-shrink-0">
                  {/* Close */}
                  <button
                    onClick={() => setIsOpen(false)}
                    className="absolute right-4 top-4 p-2 rounded-full hover:bg-accent transition-colors text-muted-foreground"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  {/* Voice toggle */}
                  <button
                    onClick={() => { if (isSpeaking) stopSpeaking(); setAutoSpeak(!autoSpeak); }}
                    className="absolute left-4 top-4 p-2 rounded-full hover:bg-accent transition-colors text-muted-foreground"
                    title={autoSpeak ? "Voice ON" : "Voice OFF"}
                  >
                    {autoSpeak ? <Volume2 className="w-4 h-4 text-primary" /> : <VolumeX className="w-4 h-4" />}
                  </button>

                  {/* Wave orb in header */}
                  <WaveOrb isActive={isRecording} isSpeaking={isSpeaking} size={96} />

                  <div className="mt-3 text-center">
                    <h3 className="font-semibold text-sm text-foreground">Ask about Abhishek</h3>
                    <div className="mt-1 h-5 flex items-center justify-center">
                      {isRecording && <VoiceBars active={true} />}
                      {isSpeaking && !isRecording && (
                        <span className="text-xs text-primary flex items-center gap-1">
                          <Volume2 className="w-3 h-3 animate-pulse" /> Speaking…
                        </span>
                      )}
                      {isLoading && !isRecording && !isSpeaking && (
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Loader2 className="w-3 h-3 animate-spin" /> Thinking…
                        </span>
                      )}
                      {!isRecording && !isSpeaking && !isLoading && (
                        <span className="text-xs text-muted-foreground">Voice-enabled AI assistant</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* ── Messages ── */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex gap-2.5 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
                    >
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-semibold ${message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-accent'}`}>
                        {message.role === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5 text-primary" />}
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

                  {/* Suggested questions */}
                  {hasOnlyWelcome && (
                    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="space-y-2 pt-1">
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
                      <div className="w-7 h-7 rounded-full bg-accent flex items-center justify-center">
                        <Bot className="w-3.5 h-3.5 text-primary" />
                      </div>
                      <div className="px-4 py-3 rounded-2xl rounded-tl-sm bg-accent flex items-center gap-1.5">
                        {[0, 150, 300].map(delay => (
                          <span key={delay} className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: `${delay}ms` }} />
                        ))}
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* ── Input bar ── */}
                <div className="p-3 border-t border-border bg-background flex-shrink-0">
                  <div className="flex gap-2 items-center">
                    {/* Mic */}
                    <motion.button
                      onClick={isRecording ? stopRecording : startRecording}
                      disabled={isLoading}
                      whileTap={{ scale: 0.9 }}
                      className={`p-2.5 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0 ${
                        isRecording
                          ? 'bg-destructive text-destructive-foreground shadow-lg'
                          : 'bg-accent text-foreground hover:bg-primary hover:text-primary-foreground'
                      }`}
                    >
                      {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                    </motion.button>

                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
                      placeholder={isRecording ? 'Listening…' : 'Ask anything about Abhishek…'}
                      disabled={isLoading || isRecording}
                      className="flex-1 px-3.5 py-2.5 text-sm rounded-xl bg-accent border border-transparent focus:outline-none focus:ring-2 focus:ring-primary text-foreground placeholder:text-muted-foreground disabled:opacity-50"
                    />

                    <motion.button
                      onClick={() => sendMessage()}
                      disabled={!input.trim() || isLoading || isRecording}
                      whileTap={{ scale: 0.9 }}
                      className="p-2.5 bg-primary text-primary-foreground rounded-xl disabled:opacity-40 disabled:cursor-not-allowed hover:bg-primary/90 transition-all flex-shrink-0"
                    >
                      <Send className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatbot;
