export interface Mistake {
  id: string;
  originalText: string;
  correctedText: string;
  explanation: string;
  pronunciation?: string;
}

export interface VocabItem {
  id: string;
  word: string;
  translation: string;
  partOfSpeech: string;
  exampleSentence: string;
  exampleTranslation: string;
}

export interface DebriefSession {
  id: string;
  scenarioId: string;
  language: string;
  score: number;
  durationSeconds: number;
  mistakes: Mistake[];
  phrasingComparison: Mistake[];
  vocabulary: VocabItem[];
  overallFeedback: string;
  date: string;
}
