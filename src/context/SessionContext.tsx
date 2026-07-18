import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Scenario, TargetLanguage } from '../types/scenario';
import type { Message, RecordingState } from '../types/chat';
import type { DebriefSession } from '../types/debrief';
import { mockDebriefs, mockDialogues, mockScenarios } from '../data/mockScenarios';

interface SessionContextType {
  currentScenario: Scenario | null;
  currentLanguage: TargetLanguage;
  proficiency: string;
  messages: Message[];
  recordingState: RecordingState;
  isTyping: boolean;
  transcription: string;
  currentDebrief: DebriefSession | null;
  history: DebriefSession[];
  
  selectScenario: (scenario: Scenario, language: TargetLanguage, proficiency: string) => void;
  startSession: () => void;
  startRecording: () => void;
  stopRecording: () => void;
  cancelRecording: () => void;
  endConversation: () => void;
  resetSession: () => void;
  loadHistoricalDebrief: (debrief: DebriefSession) => void;
  clearHistory: () => void;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

// Helper to generate IDs
const generateId = () => Math.random().toString(36).substring(2, 9);

export const SessionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentScenario, setCurrentScenario] = useState<Scenario | null>(null);
  const [currentLanguage, setCurrentLanguage] = useState<TargetLanguage>('Hindi');
  const [proficiency, setProficiency] = useState<string>('Intermediate');
  const [messages, setMessages] = useState<Message[]>([]);
  const [recordingState, setRecordingState] = useState<RecordingState>('idle');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [transcription, setTranscription] = useState<string>('');
  const [currentDebrief, setCurrentDebrief] = useState<DebriefSession | null>(null);
  const [turnIndex, setTurnIndex] = useState<number>(0);
  
  // Historical sessions prepopulated
  const [history, setHistory] = useState<DebriefSession[]>([]);

  useEffect(() => {
    // Load prepopulated history
    const initialHistory: DebriefSession[] = [
      {
        id: 'hist-1',
        scenarioId: 'chai-stall',
        language: 'Hindi',
        score: 82,
        durationSeconds: 110,
        date: new Date(Date.now() - 24 * 60 * 60 * 1000).toLocaleDateString(), // Yesterday
        overallFeedback: 'A very good attempt at ordering tea. You got the quantities correct, but need to work on faster phrasing.',
        mistakes: [
          {
            id: 'hm-1',
            originalText: 'एक अदरक चाय देना',
            correctedText: 'एक अदरक वाली चाय देना',
            explanation: 'In Hindi, we add "वाली" (waali) to specify qualities like ginger-flavored.',
            pronunciation: 'Ek adrak waali chai dena'
          }
        ],
        phrasingComparison: [],
        vocabulary: []
      },
      {
        id: 'hist-2',
        scenarioId: 'rickshaw-ride',
        language: 'Gujarati',
        score: 76,
        durationSeconds: 154,
        date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toLocaleDateString(), // 3 days ago
        overallFeedback: 'Nice conversation with Babubhai. You agreed on a rate, but could negotiate more politely using terms like "Mota bhai".',
        mistakes: [],
        phrasingComparison: [],
        vocabulary: []
      }
    ];
    
    const saved = localStorage.getItem('conversa_history');
    if (saved) {
      setHistory(JSON.parse(saved));
    } else {
      localStorage.setItem('conversa_history', JSON.stringify(initialHistory));
      setHistory(initialHistory);
    }
  }, []);

  const selectScenario = (scenario: Scenario, language: TargetLanguage, proficiencyLevel: string) => {
    setCurrentScenario(scenario);
    setCurrentLanguage(language);
    setProficiency(proficiencyLevel);
    setMessages([]);
    setTurnIndex(0);
    setCurrentDebrief(null);
  };

  const startSession = () => {
    if (!currentScenario) return;
    
    // Greeting from persona
    setIsTyping(true);
    setTimeout(() => {
      
      const welcomeMessage = currentScenario.id === 'chai-stall'
        ? (currentLanguage === 'Gujarati' ? 'કેમ છો ભાઈ! ગરમાગરમ ચા પીવી છે?' : 'आइए भाईसाब, गरमागरम चाय हाजिर है! क्या बनाऊँ?')
        : currentScenario.id === 'market-haggling'
        ? (currentLanguage === 'Hindi' ? 'राम राम भाई साहब! क्या ढूंढ रहे हैं आज? बहुत बढ़िया जैकेट आई है।' : 'Welcome! Looking for something special? I have excellent hand-made coats.')
        : currentScenario.id === 'job-interview'
        ? 'Welcome to your interview. Can you start by explaining how you approach state management in large React projects?'
        : 'રામ રામ! ક્યાં જવું છે સાહેબ? સ્ટેશન કે પેલેસ?';

      const welcomeTranslation = currentScenario.id === 'chai-stall'
        ? (currentLanguage === 'Gujarati' ? 'How are you brother! Do you want hot tea?' : 'Welcome brother, hot tea is ready! What should I make?')
        : currentScenario.id === 'market-haggling'
        ? (currentLanguage === 'Hindi' ? 'Ram Ram brother! What are you looking for today? Very nice jackets have arrived.' : 'Welcome! Looking for something special? I have excellent hand-made coats.')
        : currentScenario.id === 'job-interview'
        ? 'Welcome to your interview. Can you start by explaining how you approach state management in large React projects?'
        : 'Ram Ram! Where do you want to go sir? Station or Palace?';

      setMessages([
        {
          id: generateId(),
          sender: 'persona',
          text: welcomeMessage,
          translation: welcomeTranslation,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setIsTyping(false);
    }, 1200);
  };

  // Simulating speech-to-text
  const startRecording = () => {
    if (recordingState !== 'idle') return;
    setRecordingState('listening');
    setTranscription('');

    // Fetch the dialogue turn we want to simulate
    const dialogueList = mockDialogues[currentScenario?.id || '']?.[currentLanguage] || [];
    const turn = dialogueList[turnIndex];
    const textToType = turn ? turn.userSpeech : "नमस्ते, सब ठीक है?";

    // Typewriter effect simulation
    let currentIdx = 0;
    const words = textToType.split(' ');
    
    const interval = setInterval(() => {
      if (currentIdx < words.length) {
        setTranscription(prev => prev + (prev ? ' ' : '') + words[currentIdx]);
        currentIdx++;
      } else {
        clearInterval(interval);
      }
    }, 450);

    (window as any)._transcriptInterval = interval;
  };

  const stopRecording = () => {
    if (recordingState !== 'listening') return;
    
    // Clear typing interval if running
    if ((window as any)._transcriptInterval) {
      clearInterval((window as any)._transcriptInterval);
    }

    setRecordingState('processing');

    setTimeout(() => {
      // Complete transcription
      const dialogueList = mockDialogues[currentScenario?.id || '']?.[currentLanguage] || [];
      const turn = dialogueList[turnIndex];
      const finalUserSpeech = turn ? turn.userSpeech : "नमस्ते, सब ठीक है?";
      const finalUserTrans = turn ? turn.userTranslation : "Hello, is everything fine?";

      setTranscription(finalUserSpeech);
      setRecordingState('done');

      // Add user message
      const userMsgId = generateId();
      const userMsg: Message = {
        id: userMsgId,
        sender: 'user',
        text: finalUserSpeech,
        translation: finalUserTrans,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, userMsg]);
      setRecordingState('idle');
      
      // Setup persona response
      setIsTyping(true);
      
      setTimeout(() => {
        setIsTyping(false);
        if (turn) {
          const personaMsg: Message = {
            id: generateId(),
            sender: 'persona',
            text: turn.personaResponse,
            translation: turn.personaTranslation,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };
          setMessages(prev => [...prev, personaMsg]);
          setTurnIndex(prev => prev + 1);
        } else {
          // Fallback final greeting if turns exceed
          const farewellMsg = currentLanguage === 'Gujarati' ? 'આવજો, ફરી મળીશું!' : 'अच्छा भाईसाहब, फिर मिलेंगे!';
          const farewellTrans = currentLanguage === 'Gujarati' ? 'Goodbye, see you again!' : 'Okay brother, see you again!';
          setMessages(prev => [...prev, {
            id: generateId(),
            sender: 'persona',
            text: farewellMsg,
            translation: farewellTrans,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }]);
        }
      }, 1500);

    }, 800);
  };

  const cancelRecording = () => {
    if ((window as any)._transcriptInterval) {
      clearInterval((window as any)._transcriptInterval);
    }
    setRecordingState('idle');
    setTranscription('');
  };

  const endConversation = () => {
    if (!currentScenario) return;
    
    // Select matching mock debrief or generic
    const baseDebrief = mockDebriefs[currentScenario.id] || {
      score: 80,
      durationSeconds: 120,
      overallFeedback: 'Nice work practicing in immersion mode!',
      mistakes: [],
      phrasingComparison: [],
      vocabulary: []
    };

    const session: DebriefSession = {
      id: generateId(),
      scenarioId: currentScenario.id,
      language: currentLanguage,
      date: new Date().toLocaleDateString(),
      ...baseDebrief
    };

    setCurrentDebrief(session);
    
    // Save to history
    const updatedHistory = [session, ...history];
    setHistory(updatedHistory);
    localStorage.setItem('conversa_history', JSON.stringify(updatedHistory));
  };

  const resetSession = () => {
    setCurrentScenario(null);
    setMessages([]);
    setTurnIndex(0);
    setCurrentDebrief(null);
    setTranscription('');
    setRecordingState('idle');
  };

  const loadHistoricalDebrief = (debrief: DebriefSession) => {
    const sc = mockScenarios.find(s => s.id === debrief.scenarioId) || null;
    setCurrentScenario(sc);
    setCurrentLanguage(debrief.language as TargetLanguage);
    setCurrentDebrief(debrief);
  };

  const clearHistory = () => {
    localStorage.removeItem('conversa_history');
    setHistory([]);
  };

  return (
    <SessionContext.Provider value={{
      currentScenario,
      currentLanguage,
      proficiency,
      messages,
      recordingState,
      isTyping,
      transcription,
      currentDebrief,
      history,
      
      selectScenario,
      startSession,
      startRecording,
      stopRecording,
      cancelRecording,
      endConversation,
      resetSession,
      loadHistoricalDebrief,
      clearHistory
    }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
};
