import React from 'react';
import type { Mistake } from '../../types/debrief';
import { Sparkles } from 'lucide-react';

interface PhrasingComparisonProps {
  phrasing: Mistake[];
}

export const PhrasingComparison: React.FC<PhrasingComparisonProps> = ({ phrasing }) => {
  if (phrasing.length === 0) {
    return (
      <div className="bg-cyber-panel border border-white/5 rounded-lg p-5 text-center">
        <p className="font-sans text-xs text-white/50">No phrasing adjustments recommended for this session.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {phrasing.map((item) => (
        <div key={item.id} className="bg-cyber-panel border border-neon-cyan/20 hover:border-neon-cyan/40 rounded-lg p-4 transition-all duration-200">
          
          {/* Header */}
          <div className="flex items-center gap-2 mb-3 border-b border-white/5 pb-2">
            <Sparkles className="w-4 h-4 text-neon-cyan animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-wider text-neon-cyan font-semibold">Natural Phrasing Alternative</span>
          </div>

          {/* Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            
            {/* Clunky/Literal Phrasing */}
            <div className="bg-black/20 rounded p-3 border border-white/5">
              <span className="font-mono text-[9px] uppercase tracking-wider text-white/40 block mb-1">Literal phrasing</span>
              <p className="font-sans text-sm text-white/60">{item.originalText}</p>
            </div>

            {/* Native Phrasing */}
            <div className="bg-neon-cyan/5 rounded p-3 border border-neon-cyan/20">
              <span className="font-mono text-[9px] uppercase tracking-wider text-neon-cyan/60 block mb-1">Natural Native phrasing</span>
              <p className="font-sans text-sm text-neon-cyan font-semibold">{item.correctedText}</p>
            </div>

          </div>

          {/* Explanation */}
          <div className="mt-3 bg-white/5 rounded p-2.5 border border-white/5">
            <p className="font-sans text-xs text-white/70 leading-relaxed">
              <strong className="font-mono text-[10px] text-white/40 uppercase block mb-0.5">Cultural Context / Idiom</strong>
              {item.explanation}
            </p>
          </div>

        </div>
      ))}
    </div>
  );
};
