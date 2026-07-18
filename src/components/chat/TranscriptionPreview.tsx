import React from 'react';
import { useSession } from '../../context/SessionContext';
import { Terminal } from 'lucide-react';

export const TranscriptionPreview: React.FC = () => {
  const { transcription, recordingState } = useSession();

  if (recordingState === 'idle') return null;

  return (
    <div className="w-full bg-black/45 border border-neon-cyan/20 rounded-md p-3 font-mono text-xs text-neon-cyan/90 relative overflow-hidden">
      
      {/* Scanning laser line */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-cyan/5 to-transparent h-20 w-full animate-pulse pointer-events-none" />
      
      <div className="flex items-center gap-2 mb-1.5 border-b border-neon-cyan/15 pb-1">
        <Terminal className="w-3.5 h-3.5 animate-pulse text-neon-cyan" />
        <span className="uppercase tracking-wider font-semibold">Speech Input Monitor</span>
        <span className="ml-auto flex items-center gap-1.5">
          <span className={`w-1.5 h-1.5 rounded-full ${recordingState === 'listening' ? 'bg-red-500 animate-ping' : 'bg-neon-cyan animate-pulse'}`} />
          <span className="text-[10px] text-white/50 uppercase">
            {recordingState === 'listening' ? 'Streaming' : 'Processing Speech...'}
          </span>
        </span>
      </div>

      <div className="flex items-start gap-1 font-sans text-sm min-h-6 leading-relaxed text-white/95">
        <span>&gt;</span>
        <span className="flex-1 select-none">
          {transcription || <span className="text-white/30 italic">Start speaking to transcribe...</span>}
          {recordingState === 'listening' && (
            <span className="inline-block w-1.5 h-4 bg-neon-cyan ml-0.5 align-middle blink-cursor" />
          )}
        </span>
      </div>
    </div>
  );
};
