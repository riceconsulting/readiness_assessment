// Fix: Import React to resolve errors with React.FC type usage.
import React from 'react';

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
  icon: React.FC<{className?: string}>;
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

export type ScoreTier = 'Sangat Rendah' | 'Rendah' | 'Menengah' | 'Tinggi';

export interface ScoreExplanation {
    title: string;
    explanation: string;
}

export interface Assessment {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    icon: React.FC<{className?: string}>;
    questions: Question[];
    resultLevels: ResultLevel[];
    scoreExplanations: Record<string, Record<ScoreTier, ScoreExplanation>>;
    categoryOrder: string[];
}


export type SortOption = 'default' | 'alphabetical-text' | 'alphabetical-category';