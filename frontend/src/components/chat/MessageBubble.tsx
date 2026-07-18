import React, { useState } from 'react';
import type { Message } from '../../types/chat';
import { Globe } from 'lucide-react';

interface MessageBubbleProps {
  message: Message;
  personaAvatarSeed?: string;
  personaName?: string;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message, personaAvatarSeed, personaName }) => {
  const isUser = message.sender === 'user';
  const [showTranslation, setShowTranslation] = useState(false);

  const getAvatarColor = (seed?: string) => {
    switch (seed) {
      case 'karan': return 'from-amber-500 to-red-600';
      case 'ramesh': return 'from-purple-500 to-indigo-600';
      case 'shruti': return 'from-cyan-500 to-blue-600';
      case 'babubhai': return 'from-emerald-500 to-teal-600';
      default: return 'from-gray-500 to-slate-600';
    }
  };

  return (
    <div className={`flex gap-3 max-w-[85%] md:max-w-[75%] ${isUser ? 'self-end flex-row-reverse' : 'self-start'}`}>
      
      {/* Avatar Icon */}
      {!isUser && (
        <div className={`w-8 h-8 rounded bg-gradient-to-tr ${getAvatarColor(personaAvatarSeed)} flex items-center justify-center font-mono font-bold text-white text-sm shrink-0 border border-white/10`}>
          {personaName?.charAt(0) || 'P'}
        </div>
      )}

      {isUser && (
        <div className="w-8 h-8 rounded bg-gradient-to-tr from-neon-cyan to-blue-600 flex items-center justify-center font-mono font-bold text-cyber-bg text-sm shrink-0 border border-neon-cyan/20">
          U
        </div>
      )}

      {/* Bubble Box */}
      <div className="flex flex-col gap-1">
        
        {/* Sender and Time */}
        <div className={`flex items-center gap-2 font-mono text-[10px] text-white/40 ${isUser ? 'justify-end' : 'justify-start'}`}>
          <span className="font-semibold text-white/50">{isUser ? 'You' : (personaName || 'Partner')}</span>
          <span>•</span>
          <span>{message.timestamp}</span>
        </div>

        {/* Message Container */}
        <div className={`relative px-4 py-3 rounded-lg border transition-all duration-200 ${
          isUser 
            ? 'bg-neon-cyan/5 border-neon-cyan/20 text-white rounded-tr-none'
            : 'bg-cyber-panel/85 border-white/5 text-white/90 rounded-tl-none'
        }`}>
          
          {/* Main conversation text (sans-serif for readability) */}
          <p className="font-sans text-[15px] leading-relaxed break-words whitespace-pre-wrap select-all">
            {message.text}
          </p>

          {/* Translation helper */}
          {message.translation && (
            <div className={`mt-2 pt-2 border-t border-dashed transition-all duration-200 ${
              showTranslation ? 'opacity-100 max-h-20' : 'opacity-0 max-h-0 overflow-hidden mt-0 pt-0'
            } ${isUser ? 'border-neon-cyan/15' : 'border-white/10'}`}>
              <p className="font-sans text-[13px] text-white/60 italic">
                {message.translation}
              </p>
            </div>
          )}

          {/* Controls inside Bubble */}
          {message.translation && (
            <div className={`flex items-center gap-2 mt-1.5 ${isUser ? 'justify-end' : 'justify-start'}`}>
              <button 
                onClick={() => setShowTranslation(!showTranslation)}
                className={`font-mono text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded flex items-center gap-1 border transition-colors ${
                  showTranslation
                    ? 'bg-neon-cyan/20 border-neon-cyan/40 text-neon-cyan'
                    : 'bg-white/5 border-white/10 text-white/40 hover:text-white/70 hover:border-white/20'
                }`}
              >
                <Globe className="w-2.5 h-2.5" />
                {showTranslation ? 'Hide translation' : 'Translate'}
              </button>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
