import React from 'react';

export const TypingIndicator: React.FC = () => {
  return (
    <div className="flex items-center gap-4 py-3 px-4 max-w-[80%] rounded-lg bg-cyber-panel/60 border border-white/5 self-start">
      <div className="flex items-center gap-1.5">
        <span className="w-2.5 h-2.5 rounded-full bg-neon-cyan animate-pulse" style={{ animationDelay: '0ms' }} />
        <span className="w-2.5 h-2.5 rounded-full bg-neon-cyan animate-pulse" style={{ animationDelay: '150ms' }} />
        <span className="w-2.5 h-2.5 rounded-full bg-neon-cyan animate-pulse" style={{ animationDelay: '300ms' }} />
      </div>
      <span className="font-mono text-xs text-white/40 tracking-wider">THINKING...</span>
    </div>
  );
};
