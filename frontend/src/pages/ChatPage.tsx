import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSession } from '../context/SessionContext';
import { PageTransition } from '../components/layout/PageTransition';
import { ContextBanner } from '../components/layout/ContextBanner';
import { ChatThread } from '../components/chat/ChatThread';
import { MicButton } from '../components/chat/MicButton';
import { TranscriptionPreview } from '../components/chat/TranscriptionPreview';
import { LogOut, CheckSquare } from 'lucide-react';

export const ChatPage: React.FC = () => {
  const navigate = useNavigate();
  const { currentScenario, startSession, endConversation, resetSession } = useSession();

  // If page is loaded directly without selecting a scenario, fallback to selection
  useEffect(() => {
    if (!currentScenario) {
      navigate('/select');
    } else {
      startSession();
    }
  }, [currentScenario, navigate]);

  if (!currentScenario) return null;

  const handleAbort = () => {
    if (confirm("Are you sure you want to abort the current immersion session? Your progress won't be saved.")) {
      resetSession();
      navigate('/select');
    }
  };

  const handleComplete = () => {
    endConversation();
    navigate('/debrief');
  };

  return (
    <PageTransition>
      <div className="w-full flex-grow flex flex-col h-screen max-h-screen overflow-hidden bg-cyber-bg relative">
        
        {/* Persistent Immersion Context Banner */}
        <ContextBanner />

        {/* Scanlines overlay to give CRT screen aesthetic */}
        <div className="scanlines absolute inset-0 pointer-events-none z-10 opacity-30" />

        {/* Chat Threads Area */}
        <ChatThread />

        {/* Console / Recording Controls Footer */}
        <footer className="w-full bg-cyber-panel border-t border-white/5 p-4 flex flex-col gap-4 z-20">
          <div className="max-w-4xl mx-auto w-full flex flex-col gap-3">
            
            {/* Live speech transcription monitor */}
            <TranscriptionPreview />

            {/* Actions Bar */}
            <div className="flex items-center justify-between gap-4">
              
              {/* Left Action: Abort */}
              <button
                onClick={handleAbort}
                className="font-mono text-[10px] uppercase tracking-widest px-3.5 py-2.5 rounded border border-red-500/20 hover:border-red-500/60 bg-red-950/10 hover:bg-red-950/20 text-red-400 hover:text-red-300 transition-all duration-200 flex items-center gap-1.5 cyber-button-clip"
              >
                <LogOut className="w-3.5 h-3.5" />
                Abort Session
              </button>

              {/* Center Action: Animated Speech Mic Button */}
              <MicButton />

              {/* Right Action: Complete & Debrief */}
              <button
                onClick={handleComplete}
                className="font-mono text-[10px] uppercase tracking-widest px-3.5 py-2.5 rounded border border-neon-magenta/30 hover:border-neon-magenta bg-neon-magenta/5 hover:bg-neon-magenta/20 text-neon-magenta hover:text-white hover:shadow-[0_0_15px_rgba(255,0,127,0.35)] transition-all duration-300 flex items-center gap-1.5 cyber-button-clip"
              >
                <CheckSquare className="w-3.5 h-3.5" />
                Finish & Debrief
              </button>

            </div>

          </div>
        </footer>

      </div>
    </PageTransition>
  );
};
