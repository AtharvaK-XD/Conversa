import React from 'react';
import type { VocabItem } from '../../types/debrief';

interface VocabRecapProps {
  vocabulary: VocabItem[];
}

export const VocabRecap: React.FC<VocabRecapProps> = ({ vocabulary }) => {
  if (vocabulary.length === 0) {
    return (
      <div className="bg-cyber-panel border border-white/5 rounded-lg p-5 text-center">
        <p className="font-sans text-xs text-white/50">No vocabulary highlights recorded for this session.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {vocabulary.map((vocab) => (
        <div key={vocab.id} className="bg-cyber-panel border border-white/5 hover:border-white/10 rounded-lg p-4 flex flex-col gap-2">
          
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/5 pb-1.5">
            <span className="font-sans text-base font-bold text-white tracking-wide">{vocab.word}</span>
            <span className="font-mono text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-white/40">
              {vocab.partOfSpeech}
            </span>
          </div>

          {/* Translation */}
          <p className="font-sans text-sm text-neon-cyan font-medium">
            {vocab.translation}
          </p>

          {/* Example Sentence */}
          <div className="mt-1 bg-black/20 rounded p-2.5 border border-white/5 flex flex-col gap-1">
            <span className="font-mono text-[9px] uppercase tracking-wider text-white/30">Context Example</span>
            <p className="font-sans text-xs text-white/80">{vocab.exampleSentence}</p>
            <p className="font-sans text-xs text-white/50 italic">{vocab.exampleTranslation}</p>
          </div>

        </div>
      ))}
    </div>
  );
};
