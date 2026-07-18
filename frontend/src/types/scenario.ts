export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export type TargetLanguage = 'Hindi' | 'Gujarati' | 'English';

export interface Persona {
  id: string;
  name: string;
  role: string;
  location: string;
  avatarUrl: string;
  bio: string;
  avatarSeed: string; // for Dicebear avatars or styling
}

export interface Scenario {
  id: string;
  name: string;
  persona: Persona;
  targetLanguage: TargetLanguage[];
  difficulty: Difficulty;
  description: string;
  promptGuideline: string;
}
