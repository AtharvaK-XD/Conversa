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
      <div className="w-full flex-grow flex flex-col h-screen max-h-screen overflow-hidden bg-[#FAFAFA] text-[#18181B] relative">
        
        {/* Persistent Immersion Context Banner */}
        <ContextBanner />

        {/* Chat Threads Area */}
        <ChatThread />

        {/* Console / Recording Controls Footer */}
        <footer className="w-full bg-white border-t border-[#E4E4E7] p-4 flex flex-col gap-4 z-20 shadow-xs">
          <div className="max-w-4xl mx-auto w-full flex flex-col gap-3">
            
            {/* Live speech transcription monitor */}
            <TranscriptionPreview />

            {/* Actions Bar */}
            <div className="flex items-center justify-between gap-4">
              
              {/* Left Action: Abort */}
              <button
                onClick={handleAbort}
                className="font-mono text-xs font-semibold uppercase tracking-wider px-4 py-2.5 rounded-xl border border-red-200 bg-red-50 hover:bg-red-100 text-red-700 transition-all duration-200 flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <LogOut className="w-4 h-4 text-red-600" />
                Abort Session
              </button>

              {/* Center Action: Animated Speech Mic Button */}
              <MicButton />

              {/* Right Action: Complete & Debrief */}
              <button
                onClick={handleComplete}
                className="font-mono text-xs font-semibold uppercase tracking-wider px-4 py-2.5 rounded-xl bg-[#F4602A] hover:bg-[#d95222] text-white transition-all duration-200 flex items-center gap-1.5 cursor-pointer shadow-sm hover:shadow-md"
              >
                <CheckSquare className="w-4 h-4 text-white" />
                Finish & Debrief
              </button>

            </div>

          </div>
        </footer>

      </div>
    </PageTransition>
  );
};
