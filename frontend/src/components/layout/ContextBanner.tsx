import React from 'react';
import { useSession } from '../../context/SessionContext';
import { MapPin, Globe, Shield } from 'lucide-react';

export const ContextBanner: React.FC = () => {
  const { currentScenario, currentLanguage, proficiency } = useSession();

  if (!currentScenario) return null;

  const { persona } = currentScenario;

  // Visual avatar color depending on avatar seed
  const getAvatarColor = (seed: string) => {
    switch (seed) {
      case 'karan': return 'from-amber-600 to-red-700 border-amber-200';
      case 'ramesh': return 'from-[#27272A] to-[#3F3F46] border-zinc-300';
      case 'shruti': return 'from-zinc-800 to-zinc-950 border-zinc-300';
      case 'babubhai': return 'from-emerald-600 to-teal-700 border-emerald-200';
      default: return 'from-gray-600 to-zinc-800 border-gray-200';
    }
  };

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'Easy': return 'text-emerald-700 bg-emerald-50 border-emerald-100';
      case 'Medium': return 'text-amber-700 bg-amber-50 border-amber-100';
      case 'Hard': return 'text-rose-700 bg-rose-50 border-rose-100';
      default: return 'text-slate-600 bg-slate-50 border-slate-100';
    }
  };

  return (
    <div className="w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 p-4 sticky top-0 z-40 shadow-xs">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Persona Identity Info */}
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className={`w-11 h-11 rounded-xl bg-gradient-to-tr ${getAvatarColor(persona.avatarSeed)} border flex items-center justify-center font-mono font-bold text-white text-base shadow-xs`}>
            {persona.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] uppercase tracking-wider text-slate-400">Immersion Partner</span>
              <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse" />
              <span className="font-mono text-[9px] text-blue-600 font-semibold uppercase tracking-widest">Live Roleplay</span>
            </div>
            <h2 className="text-lg font-bold font-sans text-slate-900 leading-tight flex items-center gap-2">
              {persona.name}
              <span className="text-xs font-normal text-slate-500">({persona.role})</span>
            </h2>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-0.5 text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                {persona.location}
              </span>
            </div>
          </div>
        </div>

        {/* Mid Panel: Scenario Description */}
        <div className="hidden lg:block flex-1 max-w-md bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-600">
          <span className="font-mono text-[10px] uppercase text-slate-900 font-bold block mb-0.5">Scenario Mission</span>
          {currentScenario.description}
        </div>

        {/* Session Stats (Language, Proficiency, Difficulty) */}
        <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end border-t border-slate-200/80 md:border-0 pt-3 md:pt-0">
          <div className="flex flex-col items-start md:items-end">
            <span className="font-mono text-[9px] uppercase tracking-wider text-slate-400">Language</span>
            <span className="font-mono text-xs font-semibold text-slate-800 flex items-center gap-1.5 mt-0.5">
              <Globe className="w-3.5 h-3.5 text-blue-600" />
              {currentLanguage}
            </span>
          </div>

          <div className="h-8 w-px bg-slate-200 hidden md:block" />

          <div className="flex flex-col items-start md:items-end">
            <span className="font-mono text-[9px] uppercase tracking-wider text-slate-400">Target Level</span>
            <span className="font-mono text-xs font-semibold text-slate-800 flex items-center gap-1.5 mt-0.5">
              <Shield className="w-3.5 h-3.5 text-blue-600" />
              {proficiency}
            </span>
          </div>

          <div className="h-8 w-px bg-slate-200 hidden md:block" />

          <div className={`px-2.5 py-0.5 rounded-lg border font-mono text-xs font-semibold ${getDifficultyColor(currentScenario.difficulty)}`}>
            {currentScenario.difficulty}
          </div>
        </div>

      </div>
    </div>
  );
};
