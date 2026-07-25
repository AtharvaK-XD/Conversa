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
        return <Square className="w-5 h-5 text-white fill-white" />;
      case 'processing':
        return <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />;
      default:
        return <Mic className="w-5 h-5 text-white" />;
    }
  };

  const getButtonClass = () => {
    if (recordingState === 'listening') {
      return 'bg-red-500 hover:bg-red-600 border-red-400 shadow-sm';
    }
    if (recordingState === 'processing') {
      return 'bg-white border-blue-200 text-blue-600 cursor-wait shadow-xs';
    }
    return 'bg-blue-600 hover:bg-blue-700 border-blue-600 shadow-sm';
  };

  return (
    <div className="flex flex-col items-center gap-3">
      {/* Animated Waveform container while listening */}
      <div className="h-10 flex items-center justify-center gap-1 min-w-56">
        {recordingState === 'listening' ? (
          Array.from({ length: 18 }).map((_, i) => (
            <motion.div
              key={i}
              className="w-1 bg-blue-600 rounded-lg"
              initial={{ height: 4 }}
              animate={{
                height: [4, Math.random() * 32 + 6, 4]
              }}
              transition={{
                duration: 0.4 + Math.random() * 0.4,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
          ))
        ) : recordingState === 'processing' ? (
          <span className="font-mono text-xs text-blue-600 tracking-widest uppercase animate-pulse font-semibold">
            Processing voice print...
          </span>
        ) : (
          <span className="font-mono text-xs text-slate-400 font-medium">
            Tap mic to speak
          </span>
        )}
      </div>

      {/* Main Mic Push-to-Talk Trigger */}
      <motion.button
        onClick={handlePress}
        disabled={recordingState === 'processing'}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        animate={recordingState === 'listening' ? { scale: [1, 1.06, 1], boxShadow: ['0 0 0 0px rgba(239, 68, 68, 0.4)', '0 0 0 12px rgba(239, 68, 68, 0)', '0 0 0 0px rgba(239, 68, 68, 0.4)'] } : {}}
        transition={recordingState === 'listening' ? { repeat: Infinity, duration: 1.5, ease: 'easeInOut' } : { type: 'spring', stiffness: 400, damping: 25 }}
        className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors cursor-pointer shadow-md ${getButtonClass()}`}
      >
        {getButtonContent()}
      </motion.button>
    </div>
  );
};
