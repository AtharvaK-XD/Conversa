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
      case 'karan': return 'from-amber-500 to-red-600 border-amber-400';
      case 'ramesh': return 'from-purple-500 to-indigo-600 border-purple-400';
      case 'shruti': return 'from-cyan-500 to-blue-600 border-cyan-400';
      case 'babubhai': return 'from-emerald-500 to-teal-600 border-emerald-400';
      default: return 'from-gray-500 to-slate-600 border-gray-400';
    }
  };

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'Easy': return 'text-neon-green border-neon-green/30 bg-neon-green/10';
      case 'Medium': return 'text-neon-amber border-neon-amber/30 bg-neon-amber/10';
      case 'Hard': return 'text-neon-magenta border-neon-magenta/30 bg-neon-magenta/10';
      default: return 'text-white/50 border-white/10';
    }
  };

  return (
    <div className="w-full bg-cyber-panel/80 backdrop-blur-md border-b border-white/5 p-4 sticky top-0 z-40">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Persona Identity Info */}
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className={`w-12 h-12 rounded-lg bg-gradient-to-tr ${getAvatarColor(persona.avatarSeed)} border-2 flex items-center justify-center font-mono font-bold text-white text-lg shadow-md`}>
            {persona.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs uppercase tracking-wider text-white/40">Immersion Partner</span>
              <span className="h-1.5 w-1.5 rounded-full bg-neon-green animate-ping" />
              <span className="font-mono text-[10px] text-neon-green uppercase tracking-widest">Live Roleplay</span>
            </div>
            <h2 className="text-xl font-bold font-sans text-white leading-tight flex items-center gap-2">
              {persona.name}
              <span className="text-xs font-normal text-white/60">({persona.role})</span>
            </h2>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-0.5 text-xs text-white/50 font-mono">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-white/40" />
                {persona.location}
              </span>
            </div>
          </div>
        </div>

        {/* Mid Panel: Scenario Description */}
        <div className="hidden lg:block flex-1 max-w-md bg-white/5 border border-white/5 rounded-md px-3 py-2 text-xs text-white/60">
          <span className="font-mono text-[10px] uppercase text-neon-cyan block mb-0.5">Scenario Mission</span>
          {currentScenario.description}
        </div>

        {/* Session Stats (Language, Proficiency, Difficulty) */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-between md:justify-end border-t border-white/5 md:border-0 pt-3 md:pt-0">
          <div className="flex flex-col items-start md:items-end">
            <span className="font-mono text-[9px] uppercase tracking-wider text-white/40">Active Language</span>
            <span className="font-mono text-xs font-semibold text-neon-cyan flex items-center gap-1.5 mt-0.5">
              <Globe className="w-3.5 h-3.5" />
              {currentLanguage}
            </span>
          </div>

          <div className="h-8 w-px bg-white/10 hidden md:block" />

          <div className="flex flex-col items-start md:items-end">
            <span className="font-mono text-[9px] uppercase tracking-wider text-white/40">Target Level</span>
            <span className="font-mono text-xs font-semibold text-white/80 flex items-center gap-1.5 mt-0.5">
              <Shield className="w-3.5 h-3.5" />
              {proficiency}
            </span>
          </div>

          <div className="h-8 w-px bg-white/10 hidden md:block" />

          <div className={`px-2.5 py-1 rounded border font-mono text-xs ${getDifficultyColor(currentScenario.difficulty)}`}>
            {currentScenario.difficulty}
          </div>
        </div>

      </div>
    </div>
  );
};
