import React from 'react';
import { useSession } from '../../context/SessionContext';
import { Mic, Square, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

export const MicButton: React.FC = () => {
  const { recordingState, startRecording, stopRecording } = useSession();

  const handlePress = () => {
    if (recordingState === 'idle') {
      startRecording();
    } else if (recordingState === 'listening') {
      stopRecording();
    }
  };

  const getButtonContent = () => {
    switch (recordingState) {
      case 'listening':
        return <Square className="w-6 h-6 text-black fill-black" />;
      case 'processing':
        return <Loader2 className="w-6 h-6 text-neon-cyan animate-spin" />;
      default:
        return <Mic className="w-6 h-6 text-black" />;
    }
  };

  const getButtonClass = () => {
    if (recordingState === 'listening') {
      return 'bg-red-500 hover:bg-red-600 border-red-400 shadow-[0_0_20px_rgba(239,68,68,0.5)]';
    }
    if (recordingState === 'processing') {
      return 'bg-cyber-panel border-neon-cyan/40 cursor-wait';
    }
    return 'bg-neon-cyan hover:bg-cyan-400 border-cyan-300 shadow-[0_0_15px_rgba(0,240,255,0.3)]';
  };

  return (
    <div className="flex flex-col items-center gap-3">
      {/* Animated Waveform container while listening */}
      <div className="h-10 flex items-center justify-center gap-0.5 min-w-48">
        {recordingState === 'listening' ? (
          Array.from({ length: 15 }).map((_, i) => (
            <motion.div
              key={i}
              className="w-1 bg-gradient-to-t from-neon-cyan to-blue-500 rounded-full"
              initial={{ height: 4 }}
              animate={{
                height: [4, Math.random() * 32 + 8, 4]
              }}
              transition={{
                duration: 0.5 + Math.random() * 0.5,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
          ))
        ) : recordingState === 'processing' ? (
          <span className="font-mono text-xs text-neon-cyan/70 tracking-widest uppercase animate-pulse">
            Processing voice print...
          </span>
        ) : (
          <span className="font-mono text-xs text-white/40 tracking-wider uppercase">
            Click mic to speak
          </span>
        )}
      </div>

      {/* Main Trigger Button */}
      <div className="relative">
        {/* Pulsing ring around button */}
        {recordingState === 'listening' && (
          <div className="absolute inset-0 rounded-full bg-red-500/20 animate-ping pointer-events-none scale-125" />
        )}
        {recordingState === 'idle' && (
          <div className="absolute inset-0 rounded-full bg-neon-cyan/10 hover:bg-neon-cyan/20 animate-pulse pointer-events-none scale-110" />
        )}

        <button
          onClick={handlePress}
          disabled={recordingState === 'processing'}
          className={`w-16 h-16 rounded-full border flex items-center justify-center transition-all duration-300 transform active:scale-95 ${getButtonClass()}`}
        >
          {getButtonContent()}
        </button>
      </div>
    </div>
  );
};
