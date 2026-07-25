import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  ArrowRight, 
  Mic, 
  Award, 
  CheckCircle2, 
  XCircle, 
  ChevronRight,
  Volume2,
  Play,
  RotateCcw,
  MessageSquare,
  ShieldCheck,
  Zap,
  Globe,
  Users,
  Flame,
  Search,
  Star,
  Headphones,
  Sparkle
} from 'lucide-react';
import { PageTransition } from '../components/layout/PageTransition';

// Framer Motion Animation Variants
const containerStagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05
    }
  }
};

const fadeUpVariant = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
  }
};

// Interactive Demo Scenarios for the Hero Widget
const HERO_DEMOS = [
  {
    id: 'ramesh',
    name: 'Ramesh Lal',
    role: 'Handicraft Vendor',
    location: 'Colaba, Mumbai',
    avatar: 'R',
    avatarGradient: 'from-[#A8562E] via-[#E8A33D] to-[#F4602A]',
    dialogue: "Arre madam! 1200 Rupaye pure silk jacket ke bol raha hoon. Colaba mein isse sasta koi nahi dega!",
    translation: "Madam! I'm asking 1200 Rupees for pure silk jacket. Nobody in Colaba will sell cheaper than this!",
    userResponse: "Bhaiya 800 Rupaye bolo, abhi le leta hoon!",
    userTranslation: "Brother say 800 Rupees, I will buy right now!",
    audioText: "Arre madam! 1200 Rupaye pure silk jacket ke bol raha hoon. Colaba mein isse sasta koi nahi dega!",
    langTag: 'Bambaiya Hindi',
    difficulty: 'Medium'
  },
  {
    id: 'karan',
    name: 'Karan Bhai',
    role: 'Chai Stall Owner',
    location: 'Lal Darwaja, Ahmedabad',
    avatar: 'K',
    avatarGradient: 'from-amber-600 via-orange-500 to-yellow-500',
    dialogue: "Bhai, ek kadak adrak chai ke saath fresh maska bun try karo! Subah subah maza aa jayega.",
    translation: "Brother, try fresh butter bun with strong ginger tea! It will make your morning awesome.",
    userResponse: "Chai mein cheeni kam rakhna aur bun achha tost karna bhaiya!",
    userTranslation: "Keep less sugar in tea and toast the bun nicely brother!",
    audioText: "Bhai, ek kadak adrak chai ke saath fresh maska bun try karo! Subah subah maza aa jayega.",
    langTag: 'Gujarati Hindi',
    difficulty: 'Easy'
  },
  {
    id: 'shruti',
    name: 'Shruti Hegde',
    role: 'Lead Tech Interviewer',
    location: 'Indiranagar, Bengaluru',
    avatar: 'S',
    avatarGradient: 'from-purple-600 via-indigo-600 to-blue-500',
    dialogue: "That's a solid start. Now walk me through how your async queue handles socket dropouts under 10k RPS load.",
    translation: "Technical deep-dive on system reliability under heavy distributed traffic.",
    userResponse: "We utilize backpressure buffers with exponential retry fallbacks in Redis...",
    userTranslation: "Explaining robust architectural state recovery.",
    audioText: "That's a solid start. Now walk me through how your async queue handles socket dropouts under 10k RPS load.",
    langTag: 'Tech English',
    difficulty: 'Hard'
  }
];

// Interactive Arena Scenarios Dataset
const ARENAS_DATA = [
  {
    id: 'market-haggling',
    title: 'Mumbai Market Haggling',
    difficulty: 'Medium',
    diffColor: 'bg-amber-500',
    lang: 'Hindi',
    tag: 'Hindi / English',
    icon: '🛒',
    flavor: '"He\'s already decided you\'re overpaying. Prove him wrong with quick bargaining flair."'
  },
  {
    id: 'chai-stall',
    title: 'Ahmedabad Chai Stall',
    difficulty: 'Easy',
    diffColor: 'bg-emerald-500',
    lang: 'Gujarati',
    tag: 'Gujarati / Hindi',
    icon: '☕',
    flavor: '"Order cutting ginger chai and ask about maska bun before the morning rush."'
  },
  {
    id: 'job-interview',
    title: 'Bengaluru Tech Interview',
    difficulty: 'Hard',
    diffColor: 'bg-rose-500',
    lang: 'English',
    tag: 'English',
    icon: '💼',
    flavor: '"Explain React state management under high-pressure architectural grilling."'
  },
  {
    id: 'train-reservation',
    title: 'Howrah Train Counter',
    difficulty: 'Medium',
    diffColor: 'bg-amber-500',
    lang: 'Bengali',
    tag: 'Bengali',
    icon: '🚂',
    flavor: '"Negotiate a last-minute sleeper berth ticket for the overnight Express."'
  },
  {
    id: 'wedding-gathering',
    title: 'Kolkata Shaadi Gathering',
    difficulty: 'Easy',
    diffColor: 'bg-emerald-500',
    lang: 'Bengali',
    tag: 'Bengali / Hindi',
    icon: '🎉',
    flavor: '"Navigate sweet aunties asking about your career and marriage plans."'
  },
  {
    id: 'dhaba-order',
    title: 'Jalandhar Highway Dhaba',
    difficulty: 'Medium',
    diffColor: 'bg-amber-500',
    lang: 'Punjabi',
    tag: 'Punjabi',
    icon: '🍲',
    flavor: '"Ask for extra white butter on your tandoori parathas with authentic flair."'
  }
];

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeDemoIndex, setActiveDemoIndex] = useState(0);
  const [isPlayingHeroAudio, setIsPlayingHeroAudio] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLangFilter, setSelectedLangFilter] = useState('All');
  const [debriefTab, setDebriefTab] = useState<'score' | 'corrections' | 'audio'>('score');

  // Scroll progress signature waveform bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const activeDemo = HERO_DEMOS[activeDemoIndex];

  // Play browser Web Speech synthesis for audio preview
  const playHeroAudio = () => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    setIsPlayingHeroAudio(true);
    const utterance = new SpeechSynthesisUtterance(activeDemo.audioText);
    utterance.rate = 0.92;
    utterance.onend = () => setIsPlayingHeroAudio(false);
    utterance.onerror = () => setIsPlayingHeroAudio(false);
    window.speechSynthesis.speak(utterance);
  };

  // Filter Arenas based on user selection
  const filteredArenas = ARENAS_DATA.filter((arena) => {
    const matchesLang = selectedLangFilter === 'All' || arena.lang === selectedLangFilter || arena.tag.includes(selectedLangFilter);
    const matchesQuery = arena.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         arena.flavor.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         arena.lang.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLang && matchesQuery;
  });

  return (
    <PageTransition>
      <div className="w-full min-h-screen bg-transparent text-[#1B1A2E] font-sans relative overflow-x-hidden selection:bg-[#E8A33D]/30 selection:text-[#1B1A2E]">
        
        {/* ========================================================================= */}
        {/* SIGNATURE ANIMATED WAVEFORM SCROLL PROGRESS INDICATOR */}
        {/* ========================================================================= */}
        <div className="fixed top-0 left-0 right-0 h-1.5 z-50 bg-[#1B1A2E]/5 backdrop-blur-xs">
          <motion.div 
            className="h-full bg-gradient-to-r from-[#A8562E] via-[#E8A33D] to-[#4A5D8A]"
            style={{ scaleX, transformOrigin: '0%' }}
          />
        </div>

        {/* Ambient Top Navigation Bar */}
        <motion.header 
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between z-40 relative"
        >
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navigate('/')}>
            <div className="relative">
              <img src="/logo.png" alt="Conversa Logo" className="h-10 w-auto object-contain drop-shadow-2xs group-hover:scale-105 transition-transform" />
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif-display font-extrabold text-2xl tracking-tight text-[#1B1A2E]">
                Conversa
              </span>
              <span className="font-space-mono text-[9px] text-[#A8562E] font-bold uppercase tracking-widest -mt-1 flex items-center gap-1">
                <span>Immersion Studio</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#E8A33D]" />
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-700 text-xs font-space-mono font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Engine v2.4 Active</span>
            </div>

            <button
              onClick={() => navigate('/login')}
              className="text-xs font-semibold text-[#1B1A2E]/80 hover:text-[#1B1A2E] transition-colors cursor-pointer hidden sm:block px-3 py-2 rounded-xl hover:bg-[#1B1A2E]/5"
            >
              Sign In
            </button>
            
            <motion.button
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => navigate('/select')}
              className="font-space-mono text-xs uppercase tracking-wider px-5 py-2.5 rounded-xl bg-[#1B1A2E] hover:bg-[#A8562E] text-[#F7F3ED] font-bold shadow-md transition-all duration-200 cursor-pointer flex items-center gap-2 group"
            >
              <span>Enter an Arena</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-[#E8A33D]" />
            </motion.button>
          </div>
        </motion.header>

        {/* ========================================================================= */}
        {/* SECTION 1: HERO — Dynamic Speech Simulation */}
        {/* ========================================================================= */}
        <section className="max-w-7xl mx-auto px-6 pt-6 pb-16 md:pt-12 md:pb-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative">
          
          {/* Ambient Background Glowing Orbs */}
          <motion.div 
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-10 left-1/4 w-96 h-96 bg-gradient-to-tr from-[#E8A33D]/30 via-[#4A5D8A]/25 to-[#A8562E]/35 rounded-full blur-3xl -z-10 pointer-events-none"
          />
          <motion.div 
            animate={{
              scale: [1.1, 1, 1.1],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            className="absolute bottom-10 right-10 w-80 h-80 bg-gradient-to-br from-[#A8562E]/20 via-[#E8A33D]/20 to-[#4A5D8A]/30 rounded-full blur-3xl -z-10 pointer-events-none"
          />

          {/* Left Column: Headline & Value Proposition */}
          <motion.div 
            variants={containerStagger}
            initial="hidden"
            animate="visible"
            className="lg:col-span-6 flex flex-col gap-6"
          >
            <motion.div variants={fadeUpVariant} className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#E8A33D]/20 to-[#A8562E]/15 border border-[#E8A33D]/40 w-fit shadow-xs backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-[#A8562E] animate-pulse" />
              <span className="font-space-mono text-[11px] font-bold text-[#A8562E] tracking-wider uppercase">
                #1 Voice Immersion Platform For Indian Languages
              </span>
            </motion.div>

            <motion.h1 variants={fadeUpVariant} className="font-serif-display text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.08] text-[#1B1A2E] tracking-tight">
              "Bhaiya, yeh kitne ka hai?"
              <span className="block italic text-2xl sm:text-3xl lg:text-4xl font-normal text-[#A8562E] mt-3 gradient-text-gold">
                Say it before you can translate it.
              </span>
            </motion.h1>

            <motion.p variants={fadeUpVariant} className="font-sans text-base sm:text-lg text-[#1B1A2E]/75 leading-relaxed max-w-xl">
              Stop memorizing static flashcards in isolation. Step into real-world Indian language scenarios—bargaining in Mumbai, ordering chai in Ahmedabad, or tackling a Bengaluru tech interview—with hyper-responsive AI personas.
            </motion.p>

            {/* Action Buttons */}
            <motion.div variants={fadeUpVariant} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/select')}
                className="font-space-mono text-sm uppercase tracking-wider px-8 py-4 rounded-2xl bg-[#1B1A2E] hover:bg-[#A8562E] text-[#F7F3ED] font-bold shadow-xl hover:shadow-2xl transition-all duration-200 cursor-pointer flex items-center justify-center gap-3 group"
              >
                <Mic className="w-4 h-4 text-[#E8A33D] group-hover:scale-110 transition-transform" />
                <span>Enter an Arena</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform text-[#E8A33D]" />
              </motion.button>

              <motion.a
                whileHover={{ scale: 1.02 }}
                href="#personas"
                className="font-space-mono text-xs uppercase tracking-wider px-6 py-4 rounded-2xl border border-[#1B1A2E]/20 hover:border-[#1B1A2E]/40 text-[#1B1A2E] font-bold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer bg-white/50 backdrop-blur-sm hover:bg-white/80"
              >
                <Headphones className="w-4 h-4 text-[#A8562E]" />
                <span>Explore Personas</span>
              </motion.a>
            </motion.div>

            {/* Micro Proof Metrics Bar */}
            <motion.div variants={fadeUpVariant} className="grid grid-cols-3 gap-4 pt-6 border-t border-[#1B1A2E]/10 max-w-md">
              <div className="flex flex-col">
                <span className="font-space-mono text-xl font-bold text-[#1B1A2E]">6+</span>
                <span className="text-xs text-[#1B1A2E]/60 font-sans">Indian Languages</span>
              </div>
              <div className="flex flex-col border-l border-[#1B1A2E]/10 pl-4">
                <span className="font-space-mono text-xl font-bold text-[#A8562E]">&lt; 800ms</span>
                <span className="text-xs text-[#1B1A2E]/60 font-sans">Voice AI Latency</span>
              </div>
              <div className="flex flex-col border-l border-[#1B1A2E]/10 pl-4">
                <span className="font-space-mono text-xl font-bold text-emerald-600">100%</span>
                <span className="text-xs text-[#1B1A2E]/60 font-sans">Spontaneous Speech</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Interactive Live Simulation Hero Playground */}
          <div className="lg:col-span-6 relative">
            
            {/* Main Interactive Simulation Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass-canvas rounded-3xl p-6 sm:p-8 flex flex-col gap-6 shadow-2xl border border-white/90 relative z-10"
            >
              {/* Persona Selector Tabs inside Widget */}
              <div className="flex items-center justify-between border-b border-[#1B1A2E]/10 pb-4">
                <span className="font-space-mono text-[10px] uppercase tracking-wider text-[#1B1A2E]/50 font-bold">
                  Select Live Persona Preview:
                </span>
                
                <div className="flex items-center gap-1 bg-[#1B1A2E]/5 p-1 rounded-xl">
                  {HERO_DEMOS.map((demo, idx) => (
                    <button
                      key={demo.id}
                      onClick={() => {
                        setActiveDemoIndex(idx);
                        setIsPlayingHeroAudio(false);
                      }}
                      className={`px-3 py-1 rounded-lg text-xs font-space-mono font-bold transition-all cursor-pointer ${
                        activeDemoIndex === idx 
                          ? 'bg-[#1B1A2E] text-white shadow-xs' 
                          : 'text-[#1B1A2E]/60 hover:text-[#1B1A2E]'
                      }`}
                    >
                      {demo.name.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Persona Header Info */}
              <AnimatePresence mode="wait">
                <motion.div 
                  key={activeDemo.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${activeDemo.avatarGradient} flex items-center justify-center text-white font-mono font-bold text-lg border-2 border-white shadow-md`}>
                      {activeDemo.avatar}
                    </div>
                    <div>
                      <h4 className="font-brand font-bold text-base text-[#1B1A2E] flex items-center gap-2">
                        <span>{activeDemo.name}</span>
                        <span className="text-[10px] font-space-mono bg-[#E8A33D]/20 text-[#A8562E] px-2 py-0.5 rounded-full border border-[#E8A33D]/30">
                          {activeDemo.langTag}
                        </span>
                      </h4>
                      <span className="font-space-mono text-xs text-[#A8562E] font-semibold">
                        {activeDemo.role} • 📍 {activeDemo.location}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={playHeroAudio}
                    className="flex items-center gap-2 bg-[#E8A33D]/15 hover:bg-[#E8A33D]/30 px-3.5 py-2 rounded-xl border border-[#E8A33D]/40 transition-all cursor-pointer shadow-xs group"
                    title="Listen to persona voice sample"
                  >
                    <Volume2 className={`w-4 h-4 text-[#A8562E] ${isPlayingHeroAudio ? 'animate-bounce' : 'group-hover:scale-110'}`} />
                    <span className="font-space-mono text-xs font-bold text-[#A8562E]">
                      {isPlayingHeroAudio ? 'Playing...' : 'Play Audio'}
                    </span>
                  </button>
                </motion.div>
              </AnimatePresence>

              {/* Dynamic Speech Dialogue Stream */}
              <AnimatePresence mode="wait">
                <motion.div 
                  key={activeDemo.id + '-chat'}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col gap-4"
                >
                  {/* Persona Speech Bubble */}
                  <div className="flex gap-3 max-w-[92%] self-start">
                    <div className="glass-card rounded-2xl rounded-tl-xs p-4 flex flex-col gap-1.5 border border-white/80 shadow-sm">
                      <p className="font-sans text-sm font-semibold text-[#1B1A2E]">
                        "{activeDemo.dialogue}"
                      </p>
                      <p className="font-sans text-xs italic text-[#A8562E] opacity-90 border-t border-black/5 pt-1.5">
                        "{activeDemo.translation}"
                      </p>
                    </div>
                  </div>

                  {/* User Turn Live Waveform Bubble */}
                  <div className="flex gap-3 max-w-[88%] self-end">
                    <div className="bg-[#1B1A2E] text-[#F7F3ED] rounded-2xl rounded-tr-xs p-4 flex flex-col gap-2 shadow-xl border border-white/20">
                      <div className="flex items-center justify-between text-[11px] font-space-mono text-[#E8A33D]">
                        <span className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-[#E8A33D] animate-ping" />
                          <span>Your Spoken Response</span>
                        </span>
                        <span>00:08 / 02:00</span>
                      </div>

                      <p className="font-sans text-sm font-medium text-white">
                        "{activeDemo.userResponse}"
                      </p>

                      {/* Animated Real-Time Waveform Bar */}
                      <div className="flex items-center gap-1 h-6 pt-1">
                        {Array.from({ length: 24 }).map((_, i) => (
                          <motion.div
                            key={i}
                            className="w-1 bg-[#E8A33D] rounded-full"
                            animate={{
                              height: isPlayingHeroAudio 
                                ? [4, Math.random() * 22 + 4, 4] 
                                : [4, (i % 5 + 1) * 3.5, 4]
                            }}
                            transition={{
                              duration: 0.35 + (i % 3) * 0.1,
                              repeat: Infinity,
                              ease: 'easeInOut'
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Footer Audio Control Bar */}
              <div className="flex items-center justify-between pt-2 text-xs font-space-mono text-[#1B1A2E]/70 border-t border-[#1B1A2E]/10">
                <div className="flex items-center gap-2">
                  <Mic className="w-4 h-4 text-[#A8562E] animate-pulse" />
                  <span>Real-Time Mic Processing Ready</span>
                </div>
                <span className="font-bold text-[#A8562E]">{activeDemo.difficulty} Level</span>
              </div>
            </motion.div>

          </div>

        </section>

        {/* ========================================================================= */}
        {/* SECTION 2: THE FLUENCY CONTRAST — Problem Framing */}
        {/* ========================================================================= */}
        <section className="max-w-6xl mx-auto px-6 py-16 md:py-24 border-t border-[#1B1A2E]/10">
          
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-14"
          >
            <span className="font-space-mono text-xs uppercase tracking-widest font-bold text-[#A8562E]">
              The Fluency Gap
            </span>
            <h2 className="font-serif-display text-3xl sm:text-4xl font-extrabold text-[#1B1A2E] mt-2">
              Why traditional apps leave you speechless in real life.
            </h2>
            <p className="font-sans text-sm text-[#1B1A2E]/70 mt-2">
              Multiple-choice quizzes build recognition. Live roleplay builds spontaneous fluency.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            
            {/* Left: Traditional Apps */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-[#1B1A2E]/5 rounded-3xl p-8 border border-[#1B1A2E]/10 flex flex-col justify-between opacity-90 hover:opacity-100 transition-opacity"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-space-mono text-[#1B1A2E]/60 mb-6 font-bold">
                  <span>TRADITIONAL FLASHCARD APPS</span>
                  <XCircle className="w-4 h-4 text-rose-500" />
                </div>

                <div className="bg-white/80 rounded-2xl p-6 border border-slate-200 flex flex-col gap-4 text-center shadow-xs">
                  <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">Question 4 of 20</span>
                  <p className="font-sans text-base font-semibold text-slate-700">
                    Choose the correct translation for "Thank you":
                  </p>
                  
                  <div className="flex flex-col gap-2.5 mt-2">
                    <div className="p-3 rounded-xl border border-slate-200 text-xs font-medium text-slate-500 bg-slate-50">
                      A) Namaste
                    </div>
                    <div className="p-3 rounded-xl border-2 border-blue-500 text-xs font-bold text-blue-600 bg-blue-50">
                      B) Dhanyavad ✓
                    </div>
                    <div className="p-3 rounded-xl border border-slate-200 text-xs font-medium text-slate-500 bg-slate-50">
                      C) Haanji
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-[#1B1A2E]/10 text-xs text-[#1B1A2E]/70 font-sans leading-relaxed">
                <strong className="text-rose-600">Result:</strong> You get 100% on app quizzes, but freeze when a real chai vendor asks a spontaneous question.
              </div>
            </motion.div>

            {/* Right: Conversa Immersion */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.01 }}
              className="glass-canvas rounded-3xl p-8 border-2 border-[#E8A33D]/80 flex flex-col justify-between shadow-xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 px-4 py-1.5 bg-[#E8A33D] text-[#1B1A2E] font-space-mono text-[10px] font-bold uppercase rounded-bl-xl tracking-wider shadow-xs">
                Conversa Immersion
              </div>

              <div>
                <div className="flex items-center justify-between text-xs font-space-mono text-[#A8562E] mb-6 font-bold">
                  <span>REAL-WORLD SPEECH ARENA</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                </div>

                <div className="glass-card rounded-2xl p-6 border border-white flex flex-col gap-4 shadow-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                    <span className="font-brand font-bold text-sm text-[#1B1A2E]">Spontaneous Market Reaction</span>
                  </div>

                  <p className="font-serif-display text-lg font-bold text-[#1B1A2E] leading-snug">
                    "Bhaiya, kitna time pass karoge? 900 cash bol rahe ho toh pakka karo, varna aage bado!"
                  </p>

                  <div className="p-3 rounded-xl bg-[#E8A33D]/15 border border-[#E8A33D]/30 text-xs text-[#A8562E] font-medium leading-relaxed">
                    💡 <strong>Cultural Context:</strong> Vendor tests your conviction. Responding with immediate cash offer signals serious buying intent.
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-[#1B1A2E]/10 text-xs text-[#1B1A2E] leading-relaxed">
                <strong className="text-[#A8562E]">Result:</strong> Natural vocal muscle memory, instant cultural confidence, and zero hesitation in public.
              </div>
            </motion.div>

          </div>

        </section>

        {/* ========================================================================= */}
        {/* SECTION 3: INTERACTIVE SCENARIO ARENAS EXPLORER */}
        {/* ========================================================================= */}
        <section className="max-w-7xl mx-auto px-6 py-16 md:py-24 border-t border-[#1B1A2E]/10">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8"
          >
            <div>
              <span className="font-space-mono text-xs uppercase tracking-widest font-bold text-[#A8562E]">
                Immersion Arenas
              </span>
              <h2 className="font-serif-display text-3xl sm:text-4xl font-extrabold text-[#1B1A2E] mt-2">
                Real scenarios. Authentic stakes.
              </h2>
            </div>

            {/* Interactive Search Bar */}
            <div className="relative min-w-[260px]">
              <Search className="w-4 h-4 text-[#1B1A2E]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search scenarios..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/70 border border-[#1B1A2E]/15 text-xs font-sans text-[#1B1A2E] placeholder-[#1B1A2E]/40 focus:outline-none focus:border-[#A8562E] transition-all shadow-2xs"
              />
            </div>
          </motion.div>

          {/* Language Filter Chips Bar */}
          <div className="flex flex-wrap items-center gap-2 mb-8">
            {['All', 'Hindi', 'Gujarati', 'Bengali', 'Punjabi', 'English'].map((lang) => (
              <button
                key={lang}
                onClick={() => setSelectedLangFilter(lang)}
                className={`px-4 py-2 rounded-xl text-xs font-space-mono font-bold transition-all cursor-pointer border ${
                  selectedLangFilter === lang
                    ? 'bg-[#1B1A2E] text-white border-[#1B1A2E] shadow-sm'
                    : 'bg-white/60 text-[#1B1A2E]/70 border-[#1B1A2E]/10 hover:bg-white hover:text-[#1B1A2E]'
                }`}
              >
                {lang === 'All' ? '🌟 All Arenas' : lang}
              </button>
            ))}
          </div>

          {/* Interactive Arena Grid */}
          <motion.div 
            variants={containerStagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {filteredArenas.map((arena) => (
                <motion.div
                  key={arena.id}
                  layout
                  variants={fadeUpVariant}
                  whileHover={{ y: -6, scale: 1.015 }}
                  whileTap={{ scale: 0.985 }}
                  onClick={() => navigate('/select')}
                  className="glass-card rounded-3xl p-6 flex flex-col justify-between gap-6 cursor-pointer border border-white/80 shadow-md group relative overflow-hidden"
                >
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl">{arena.icon}</span>

                      <div className="flex items-center gap-2">
                        <span className="font-space-mono text-[10px] font-bold text-[#A8562E] bg-[#E8A33D]/15 px-2.5 py-1 rounded-md border border-[#E8A33D]/30">
                          {arena.tag}
                        </span>
                        <div className="flex items-center gap-1 text-[10px] font-space-mono font-semibold text-[#1B1A2E]/70 bg-black/5 px-2 py-1 rounded-md">
                          <span className={`w-2 h-2 rounded-full ${arena.diffColor}`} />
                          <span>{arena.difficulty}</span>
                        </div>
                      </div>
                    </div>

                    <h3 className="font-serif-display font-bold text-xl text-[#1B1A2E] group-hover:text-[#A8562E] transition-colors leading-tight">
                      {arena.title}
                    </h3>

                    <p className="font-sans text-xs italic text-[#1B1A2E]/80 leading-relaxed bg-white/50 p-3 rounded-xl border border-black/5">
                      {arena.flavor}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-[#1B1A2E]/10 text-xs font-space-mono text-[#1B1A2E]/60 group-hover:text-[#1B1A2E]">
                    <span>Enter Arena</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform text-[#A8562E]" />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

        </section>

        {/* ========================================================================= */}
        {/* SECTION 4: PERSONA SHOWCASE */}
        {/* ========================================================================= */}
        <section id="personas" className="max-w-7xl mx-auto px-6 py-16 md:py-24 border-t border-[#1B1A2E]/10">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto mb-14"
          >
            <span className="font-space-mono text-xs uppercase tracking-widest font-bold text-[#A8562E]">
              AI Personas With Character
            </span>
            <h2 className="font-serif-display text-3xl sm:text-4xl font-extrabold text-[#1B1A2E] mt-2">
              Meet your conversation partners.
            </h2>
            <p className="font-sans text-sm text-[#1B1A2E]/70 mt-2">
              Not robotic text-bots—each persona brings authentic local accents, situational humor, and cultural depth.
            </p>
          </motion.div>

          <motion.div 
            variants={containerStagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[
              {
                id: 'karan',
                name: 'Karan Bhai',
                role: 'Chai Stall Master',
                location: 'Lal Darwaja, Ahmedabad',
                trait: 'Fast-talking, cheerful, ginger chai specialist',
                dialect: 'Gujarati-accented Hindi',
                bgColor: 'from-amber-500/20 to-orange-500/20'
              },
              {
                id: 'ramesh',
                name: 'Ramesh Lal',
                role: 'Handicraft Shopkeeper',
                location: 'Colaba Causeway, Mumbai',
                trait: 'Tough negotiator, warm smile, loves haggling banter',
                dialect: 'Bambaiya Hindi',
                bgColor: 'from-blue-500/20 to-indigo-500/20'
              },
              {
                id: 'shruti',
                name: 'Shruti Hegde',
                role: 'Technical Lead',
                location: 'Indiranagar, Bengaluru',
                trait: 'Sharp, analytical, high-pressure interviewer',
                dialect: 'Corporate Tech English',
                bgColor: 'from-purple-500/20 to-pink-500/20'
              },
              {
                id: 'subir',
                name: 'Subir Da',
                role: 'Tram Conductor',
                location: 'College Street, Kolkata',
                trait: 'Literary, soft-spoken, loves vintage book stores',
                dialect: 'Calcutta Bengali',
                bgColor: 'from-emerald-500/20 to-teal-500/20'
              },
              {
                id: 'gurpreet',
                name: 'Gurpreet Singh',
                role: 'Dhaba Owner',
                location: 'GT Road, Jalandhar',
                trait: 'Hearty host, generous with butter, loud laughter',
                dialect: 'Majha Punjabi',
                bgColor: 'from-red-500/20 to-amber-500/20'
              },
              {
                id: 'selvam',
                name: 'Selvam',
                role: 'Auto Driver',
                location: 'Marina Beach, Chennai',
                trait: 'Fast-route specialist, knows every city shortcut',
                dialect: 'Madras Tamil',
                bgColor: 'from-cyan-500/20 to-blue-500/20'
              }
            ].map((persona) => (
              <motion.div
                key={persona.id}
                variants={fadeUpVariant}
                whileHover={{ y: -6, scale: 1.02 }}
                className="glass-card rounded-3xl p-6 flex flex-col justify-between border border-white/80 shadow-md relative overflow-hidden group cursor-pointer"
              >
                <div className="flex items-start gap-4">
                  <motion.div 
                    whileHover={{ rotate: 6, scale: 1.1 }}
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${persona.bgColor} border border-white flex items-center justify-center font-serif-display font-bold text-[#1B1A2E] text-2xl shrink-0 shadow-xs`}
                  >
                    {persona.name.charAt(0)}
                  </motion.div>

                  <div>
                    <h3 className="font-serif-display font-bold text-lg text-[#1B1A2E]">
                      {persona.name}
                    </h3>
                    <span className="font-space-mono text-xs text-[#A8562E] font-semibold block">
                      {persona.role}
                    </span>
                    <span className="text-[11px] font-sans text-[#1B1A2E]/60 block mt-0.5">
                      📍 {persona.location}
                    </span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[#1B1A2E]/10 flex flex-col gap-2">
                  <div className="text-xs font-sans text-[#1B1A2E]/85">
                    <strong>Personality:</strong> {persona.trait}
                  </div>
                  <div className="text-[11px] font-space-mono text-[#4A5D8A] font-semibold">
                    🗣️ Dialect: {persona.dialect}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </section>

        {/* ========================================================================= */}
        {/* SECTION 5: INTERACTIVE POST-SESSION DEBRIEF TEASER */}
        {/* ========================================================================= */}
        <section className="max-w-6xl mx-auto px-6 py-16 md:py-24 border-t border-[#1B1A2E]/10">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto mb-14"
          >
            <span className="font-space-mono text-xs uppercase tracking-widest font-bold text-[#A8562E]">
              Instant AI Speech Debrief
            </span>
            <h2 className="font-serif-display text-3xl sm:text-4xl font-extrabold text-[#1B1A2E] mt-2">
              Actionable feedback after every exchange.
            </h2>
            <p className="font-sans text-sm text-[#1B1A2E]/70 mt-2">
              Get immediate breakdown on fluency, grammar, vocabulary upgrades, and cultural etiquette.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="glass-canvas rounded-3xl p-6 md:p-12 border border-white/80 shadow-2xl flex flex-col gap-8"
          >
            
            {/* Top Score Bar */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-[#1B1A2E]/10 pb-6">
              <div className="flex items-center gap-4">
                <motion.div 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                  className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#E8A33D] to-[#A8562E] text-white flex items-center justify-center font-space-mono text-2xl font-bold shadow-md"
                >
                  88
                </motion.div>
                <div>
                  <h3 className="font-serif-display text-xl font-bold text-[#1B1A2E]">
                    Overall Immersion Score: Grade A
                  </h3>
                  <span className="font-space-mono text-xs text-[#A8562E] font-semibold">
                    Mumbai Market Haggling • Spoken Hindi Session
                  </span>
                </div>
              </div>

              {/* Debrief Interactive Tabs */}
              <div className="flex items-center gap-1 bg-[#1B1A2E]/5 p-1 rounded-xl">
                <button
                  onClick={() => setDebriefTab('score')}
                  className={`px-4 py-2 rounded-lg text-xs font-space-mono font-bold transition-all cursor-pointer ${
                    debriefTab === 'score' ? 'bg-[#1B1A2E] text-white shadow-xs' : 'text-[#1B1A2E]/70 hover:text-[#1B1A2E]'
                  }`}
                >
                  Metric Scorecard
                </button>
                <button
                  onClick={() => setDebriefTab('corrections')}
                  className={`px-4 py-2 rounded-lg text-xs font-space-mono font-bold transition-all cursor-pointer ${
                    debriefTab === 'corrections' ? 'bg-[#1B1A2E] text-white shadow-xs' : 'text-[#1B1A2E]/70 hover:text-[#1B1A2E]'
                  }`}
                >
                  Phrase Corrections
                </button>
              </div>
            </div>

            {/* Tab 1: Metric Scores */}
            {debriefTab === 'score' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
              >
                {[
                  { label: 'Fluency & Speed', score: '88%', barWidth: '88%', color: 'bg-[#E8A33D]' },
                  { label: 'Grammatical Accuracy', score: '94%', barWidth: '94%', color: 'bg-emerald-500' },
                  { label: 'Vocabulary Richness', score: '82%', barWidth: '82%', color: 'bg-blue-500' },
                  { label: 'Cultural Haggling Nuance', score: '96%', barWidth: '96%', color: 'bg-purple-500' }
                ].map((metric, i) => (
                  <div key={i} className="glass-card rounded-2xl p-5 border border-white/70 flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <span className="font-sans text-xs font-semibold text-[#1B1A2E]/75">{metric.label}</span>
                      <span className="font-space-mono font-bold text-sm text-[#1B1A2E]">{metric.score}</span>
                    </div>

                    <div className="w-full bg-[#1B1A2E]/10 h-2 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: '0%' }}
                        animate={{ width: metric.barWidth }}
                        transition={{ duration: 0.8, ease: 'easeOut', delay: i * 0.1 }}
                        className={`h-full ${metric.color} rounded-full`}
                      />
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {/* Tab 2: Concrete Phrase Corrections */}
            {debriefTab === 'corrections' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card rounded-2xl p-6 border border-white/80 flex flex-col gap-4"
              >
                <div className="flex items-center justify-between text-xs font-space-mono text-[#A8562E] font-bold">
                  <span>Phrase Upgrade Analysis</span>
                  <span>Exchange Line 3</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-rose-50/80 border border-rose-200 text-xs">
                    <span className="font-space-mono font-bold text-rose-700 uppercase tracking-wider block mb-1">
                      Your Spoken Sentence
                    </span>
                    <p className="font-sans text-slate-800 font-medium">
                      "Main yeh shirt so rupaye kam main chahta hoon."
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-emerald-50/80 border border-emerald-200 text-xs">
                    <span className="font-space-mono font-bold text-emerald-700 uppercase tracking-wider block mb-1">
                      Native Idiomatic Upgrade
                    </span>
                    <p className="font-sans text-slate-900 font-semibold">
                      "Bhaiya, thoda toh discount do! 800 final bolo, abhi pack karwa lo."
                    </p>
                  </div>
                </div>

                <p className="text-xs font-sans text-[#1B1A2E]/80 italic bg-white/60 p-3 rounded-xl border border-black/5">
                  💡 <strong>Cultural Tip:</strong> Adding 'pack karwa lo' signals immediate intent to close the deal, unlocking the shopkeeper's bottom price.
                </p>
              </motion.div>
            )}

          </motion.div>

        </section>

        {/* ========================================================================= */}
        {/* SECTION 6: FOOTER / CTA */}
        {/* ========================================================================= */}
        <section className="max-w-7xl mx-auto px-6 py-16 md:py-24 border-t border-[#1B1A2E]/10">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-canvas rounded-3xl p-8 md:p-14 border border-white/80 shadow-2xl flex flex-col items-center text-center gap-8 relative overflow-hidden"
          >
            <div className="max-w-2xl flex flex-col items-center gap-4">
              <span className="font-space-mono text-xs uppercase tracking-widest font-bold text-[#A8562E]">
                Your First Arena Is Ready
              </span>
              <h2 className="font-serif-display text-4xl sm:text-5xl font-extrabold text-[#1B1A2E]">
                Choose your target language & enter the arena.
              </h2>
              <p className="font-sans text-sm sm:text-base text-[#1B1A2E]/75 max-w-lg">
                Click any language chip to load filtered immersion scenarios.
              </p>
            </div>

            {/* Clickable Language Chips Grid */}
            <div className="flex flex-wrap items-center justify-center gap-3 max-w-3xl">
              {[
                { name: 'Hindi', count: '10 Arenas', flag: '🇮🇳' },
                { name: 'Gujarati', count: '2 Arenas', flag: '🇮🇳' },
                { name: 'Bengali', count: '2 Arenas', flag: '🇮🇳' },
                { name: 'Tamil', count: '1 Arena', flag: '🇮🇳' },
                { name: 'Punjabi', count: '1 Arena', flag: '🇮🇳' },
                { name: 'English', count: '3 Arenas', flag: '🌐' }
              ].map((lang) => (
                <motion.button
                  key={lang.name}
                  whileHover={{ scale: 1.08, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate(`/select?lang=${lang.name}`)}
                  className="glass-card px-5 py-3 rounded-2xl border border-white/80 text-xs font-space-mono font-bold text-[#1B1A2E] hover:text-[#A8562E] hover:border-[#E8A33D] transition-all cursor-pointer flex items-center gap-2.5 shadow-xs"
                >
                  <span className="text-base">{lang.flag}</span>
                  <span>{lang.name}</span>
                  <span className="text-[10px] text-[#1B1A2E]/50 font-normal">({lang.count})</span>
                </motion.button>
              ))}
            </div>

            {/* Launch Action Button */}
            <div className="pt-4">
              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => navigate('/select')}
                className="font-space-mono text-sm uppercase tracking-wider px-8 py-4 rounded-2xl bg-[#1B1A2E] hover:bg-[#A8562E] text-[#F7F3ED] font-bold shadow-xl transition-all duration-200 cursor-pointer flex items-center gap-3 group"
              >
                <span>Launch Conversa Studio</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform text-[#E8A33D]" />
              </motion.button>
            </div>
          </motion.div>

          {/* Footer Bottom Bar */}
          <footer className="mt-16 pt-8 border-t border-[#1B1A2E]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-space-mono text-[#1B1A2E]/60">
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="Conversa Logo" className="h-6 w-auto object-contain" />
              <span>© {new Date().getFullYear()} Conversa AI. All rights reserved.</span>
            </div>

            <div className="flex items-center gap-6">
              <button onClick={() => navigate('/select')} className="hover:text-[#1B1A2E] cursor-pointer">
                Arenas
              </button>
              <button onClick={() => navigate('/history')} className="hover:text-[#1B1A2E] cursor-pointer">
                Session Logs
              </button>
              <button onClick={() => navigate('/debrief')} className="hover:text-[#1B1A2E] cursor-pointer">
                Analytics
              </button>
            </div>
          </footer>

        </section>

      </div>
    </PageTransition>
  );
};
