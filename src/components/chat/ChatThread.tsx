import React, { useEffect, useRef } from 'react';
import { useSession } from '../../context/SessionContext';
import { MessageBubble } from './MessageBubble';
import { TypingIndicator } from './TypingIndicator';

export const ChatThread: React.FC = () => {
  const { messages, isTyping, currentScenario } = useSession();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 flex flex-col gap-6 scrollbar-thin">
      
      {/* Starting context prompt guideline */}
      {currentScenario && (
        <div className="mx-auto max-w-lg bg-cyber-panel border border-white/5 rounded-lg p-4 text-center">
          <h3 className="font-mono text-xs uppercase tracking-wider text-neon-cyan mb-1.5">Mission Guideline</h3>
          <p className="font-sans text-sm text-white/70 leading-relaxed">
            {currentScenario.promptGuideline}
          </p>
          <div className="mt-3 flex items-center justify-center gap-2 font-mono text-[10px] text-white/40">
            <span>IMMERSION ACTIVE</span>
            <span>•</span>
            <span className="text-neon-cyan">PERSONA NEVER BREAKS CHARACTER</span>
          </div>
        </div>
      )}

      {/* Messages */}
      {messages.map((message) => (
        <MessageBubble 
          key={message.id} 
          message={message} 
          personaAvatarSeed={currentScenario?.persona.avatarSeed}
          personaName={currentScenario?.persona.name}
        />
      ))}

      {/* Typing indicator */}
      {isTyping && <TypingIndicator />}

      {/* Bottom anchor */}
      <div ref={bottomRef} />
    </div>
  );
};
