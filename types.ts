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
