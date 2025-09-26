export interface Option {
  text: string;
  score: number;
}

export interface Question {
  id: string;
  category: string;
  text: string;
  options: Option[];
}

export interface Answer {
  questionId: string;
  score: number;
}

// Fix: Added missing ChatMessage type for the AI chat feature.
export interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
}

export interface Recommendation {
  text: string;
  explanation: string;
}

export interface ResultLevel {
  level: string;
  minScore: number;
  maxScore: number;
  title: string;
  description: string;
  recommendations: Recommendation[];
  color: string;
}

export type SortOption = 'default' | 'alphabetical-text' | 'alphabetical-category';