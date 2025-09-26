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
    }, 500); // Wait for fade out animation
  };

  return (
    <div className={`transition-all duration-500 ease-in-out ${fade ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
      <p className="text-sm font-semibold text-[#5890AD] dark:text-[#9BBBCC] mb-2">{question.category}</p>
      <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-100 mb-6">
        {question.text}
      </h2>
      <div className="space-y-4">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionClick(option.score)}
            className="group flex w-full transform items-center rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-[#203A43] p-4 text-left shadow-sm transition-all duration-300 ease-in-out hover:scale-[1.02] hover:border-[#9BBBCC] dark:hover:border-[#5890AD] hover:bg-[#5890AD]/10 dark:hover:bg-[#5890AD]/20 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#5890AD] focus:ring-offset-2 dark:focus:ring-offset-[#1A2E35]"
          >
            <span className="mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md bg-[#5890AD]/20 dark:bg-[#9BBBCC]/20 font-bold text-[#5890AD] dark:text-[#9BBBCC] transition-colors duration-300 group-hover:bg-[#5890AD] group-hover:text-white">
              {String.fromCharCode(65 + index)}
            </span>
            <span className="font-medium text-slate-700 dark:text-slate-300">{option.text}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;