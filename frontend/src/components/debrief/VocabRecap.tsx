import React from 'react';
import type { VocabItem } from '../../types/debrief';

interface VocabRecapProps {
  vocabulary: VocabItem[];
}

export const VocabRecap: React.FC<VocabRecapProps> = ({ vocabulary }) => {
  if (vocabulary.length === 0) {
    return (
      <div className="bg-[#F4F4F5] border border-[#E4E4E7] rounded-xl p-5 text-center">
        <p className="font-sans text-xs text-zinc-500">No vocabulary highlights recorded for this session.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {vocabulary.map((vocab) => (
        <div key={vocab.id} className="bg-white border border-[#E4E4E7] hover:border-zinc-300 rounded-xl p-4 flex flex-col gap-2 shadow-xs transition-all duration-200">
          
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#E4E4E7] pb-2">
            <span className="font-sans text-base font-bold text-[#18181B] tracking-wide">{vocab.word}</span>
            <span className="font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-md bg-zinc-100 border border-zinc-200 text-zinc-700 font-semibold">
              {vocab.partOfSpeech}
            </span>
          </div>

          {/* Translation */}
          <p className="font-sans text-sm text-zinc-900 font-extrabold">
            {vocab.translation}
          </p>

          {/* Example Sentence */}
          <div className="mt-1 bg-[#F4F4F5] rounded-xl p-3 border border-[#E4E4E7] flex flex-col gap-1">
            <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-400 font-semibold">Context Example</span>
            <p className="font-sans text-xs text-zinc-800 font-medium">{vocab.exampleSentence}</p>
            <p className="font-sans text-xs text-zinc-500 italic">{vocab.exampleTranslation}</p>
          </div>

        </div>
      ))}
    </div>
  );
};
