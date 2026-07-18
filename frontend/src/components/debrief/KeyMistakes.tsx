import React from 'react';
import type { Mistake } from '../../types/debrief';
import { AlertCircle } from 'lucide-react';

interface KeyMistakesProps {
  mistakes: Mistake[];
}

export const KeyMistakes: React.FC<KeyMistakesProps> = ({ mistakes }) => {
  if (mistakes.length === 0) {
    return (
      <div className="bg-cyber-panel border border-neon-green/20 rounded-lg p-5 text-center">
        <h3 className="font-mono text-sm uppercase text-neon-green tracking-wider mb-1">Zero Errors Detected!</h3>
        <p className="font-sans text-xs text-white/60">Amazing! Your grammar and syntax matching were completely clean.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {mistakes.map((mistake) => (
        <div key={mistake.id} className="bg-cyber-panel border border-neon-magenta/20 hover:border-neon-magenta/40 rounded-lg p-4 transition-all duration-200">
          
          {/* Header */}
          <div className="flex items-center gap-2 mb-3 border-b border-white/5 pb-2">
            <AlertCircle className="w-4 h-4 text-neon-magenta" />
            <span className="font-mono text-xs uppercase tracking-wider text-neon-magenta font-semibold">Grammar / Spelling Correction</span>
          </div>

          {/* Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            
            {/* Original Text */}
            <div className="bg-black/20 rounded p-3 border border-white/5">
              <span className="font-mono text-[9px] uppercase tracking-wider text-white/40 block mb-1">What you said</span>
              <p className="font-sans text-sm text-red-400 font-medium">{mistake.originalText}</p>
              {mistake.pronunciation && (
                <p className="font-mono text-[10px] text-white/30 mt-1 italic">"{mistake.pronunciation}"</p>
              )}
            </div>

            {/* Corrected Text */}
            <div className="bg-neon-green/5 rounded p-3 border border-neon-green/20 relative">
              <span className="font-mono text-[9px] uppercase tracking-wider text-neon-green/60 block mb-1">Recommended correction</span>
              <p className="font-sans text-sm text-neon-green font-medium">{mistake.correctedText}</p>
            </div>

          </div>

          {/* Explanation */}
          <div className="mt-3 bg-white/5 rounded p-2.5 border border-white/5">
            <p className="font-sans text-xs text-white/70 leading-relaxed">
              <strong className="font-mono text-[10px] text-white/40 uppercase block mb-0.5">Grammar Rule / Critique</strong>
              {mistake.explanation}
            </p>
          </div>

        </div>
      ))}
    </div>
  );
};
