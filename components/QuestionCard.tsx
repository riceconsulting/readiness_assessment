
import React, { useState, useEffect } from 'react';
import type { Question } from '../types';

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  onAnswer: (questionId: string, score: number) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, onAnswer, questionNumber }) => {
  const [fade, setFade] = useState(false);
  
  useEffect(() => {
    setFade(true);
    return () => setFade(false);
  }, [question.id]);

  const handleOptionClick = (score: number) => {
    setFade(false);
    setTimeout(() => {
        onAnswer(question.id, score);
    }, 300); // Wait for fade out animation
  };

  return (
    <div className={`transition-opacity duration-300 ${fade ? 'opacity-100' : 'opacity-0'}`}>
      <p className="text-sm font-semibold text-green-600 mb-2">{question.category}</p>
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
        {question.text}
      </h2>
      <div className="space-y-4">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionClick(option.score)}
            className="w-full text-left p-4 bg-gray-100 rounded-lg border-2 border-transparent hover:bg-green-50 hover:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-all duration-200"
          >
            <span className="font-medium text-gray-700">{option.text}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
