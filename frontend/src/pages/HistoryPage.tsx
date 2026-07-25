import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSession } from '../context/SessionContext';
import { PageTransition } from '../components/layout/PageTransition';
import { mockScenarios } from '../data/mockScenarios';
import { ArrowLeft, Trash2, Calendar, FileText, ChevronRight, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 }
};

export const HistoryPage: React.FC = () => {
  const navigate = useNavigate();
  const { history, loadHistoricalDebrief, clearHistory } = useSession();

  const handleRowClick = (debrief: any) => {
    loadHistoricalDebrief(debrief);
    navigate('/debrief');
  };

  const getScenarioName = (id: string) => {
    return mockScenarios.find(s => s.id === id)?.name || id;
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-emerald-800';
    if (score >= 75) return 'text-blue-600';
    return 'text-amber-800';
  };

  return (
    <PageTransition>
      <div className="w-full max-w-5xl mx-auto p-3 md:p-4 min-h-screen bg-transparent">
        <div className="glass-canvas rounded-2xl md:rounded-3xl p-6 md:p-8 flex flex-col gap-8 text-slate-900">
        
        {/* Header */}
        <header className="flex items-center justify-between border-b border-slate-200 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1.5 font-mono text-xs uppercase tracking-widest text-blue-600 font-bold">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse" />
              Conversation Archives
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 m-0 flex items-center gap-3">
              <img src="/logo.png" className="w-10 h-10 object-contain" alt="Conversa Logo" />
              Session <span className="text-blue-600 font-extrabold">History</span>
            </h1>
            <p className="font-sans text-xs text-slate-500 mt-1">
              Browse your past immersion attempts, fluency logs, and critique metrics.
            </p>
          </div>
          
          <button
            onClick={() => navigate('/select')}
            className="font-mono text-xs uppercase tracking-wider px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 shadow-2xs transition-colors duration-200 flex items-center gap-1.5 cursor-pointer font-semibold"
          >
            <ArrowLeft className="w-4 h-4 text-blue-600" />
            Selection
          </button>
        </header>

        {/* History Area */}
        <div className="flex flex-col gap-4">
          
          <div className="flex items-center justify-between border-b border-slate-200 pb-2 font-mono text-[10px] uppercase text-slate-400 font-semibold">
            <span>Past Sessions ({history.length})</span>
            {history.length > 0 && (
              <button
                onClick={clearHistory}
                className="text-rose-700 hover:text-rose-800 flex items-center gap-1 hover:underline cursor-pointer font-semibold"
              >
                <Trash2 className="w-4 h-4" />
                Clear Logs
              </button>
            )}
          </div>

          {history.length > 0 ? (
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="flex flex-col gap-3"
            >
              {history.map((debrief) => (
                <motion.div
                  key={debrief.id}
                  variants={itemVariants}
                  whileHover={{ y: -2, transition: { duration: 0.2 } }}
                  onClick={() => handleRowClick(debrief)}
                  className="glass-card rounded-xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 cursor-pointer group"
                >
                  
                  {/* Scenario Info */}
                  <div className="flex items-center gap-3.5">
                    <div className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0 shadow-3xs">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-sans text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                        {getScenarioName(debrief.scenarioId)}
                      </h3>
                      <div className="flex items-center gap-2 mt-0.5 text-[10px] text-slate-400 font-mono">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-blue-600" />
                          {debrief.date}
                        </span>
                        <span>•</span>
                        <span className="text-slate-500 font-medium">{debrief.language}</span>
                      </div>
                    </div>
                  </div>

                  {/* Summary & Score */}
                  <div className="flex items-center gap-6 justify-between w-full md:w-auto border-t border-slate-100 md:border-0 pt-3 md:pt-0">
                    
                    <div className="hidden lg:block text-right max-w-xs">
                      <p className="font-sans text-xs text-slate-500 line-clamp-1 italic">
                        "{debrief.overallFeedback}"
                      </p>
                    </div>

                    <div className="flex items-center gap-4 ml-auto">
                      <div className="text-right font-mono">
                        <span className="text-[9px] uppercase tracking-wider text-slate-400 block leading-none font-semibold">Fluency</span>
                        <span className={`text-base font-extrabold ${getScoreColor(debrief.score)}`}>
                          {debrief.score}%
                        </span>
                      </div>

                      <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
                    </div>

                  </div>

                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-slate-300 rounded-xl bg-white shadow-3xs">
              <Activity className="w-8 h-8 text-blue-600 mb-2 animate-pulse" />
              <p className="font-mono text-xs text-slate-500 uppercase tracking-wider font-semibold">
                No Archive Found
              </p>
              <p className="font-sans text-xs text-slate-400 mt-1 max-w-xs">
                You haven't completed any immersion scenarios yet. Launch an arena from selection and complete it to generate records.
              </p>
            </div>
          )}

        </div>

        </div>
      </div>
    </PageTransition>
  );
};
