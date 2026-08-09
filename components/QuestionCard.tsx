import React, { useState, useEffect } from 'react';
import type { Question } from '../types';

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  onAnswer: (questionId: string, score: number) => void;
  onBack: () => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, onAnswer, onBack, questionNumber }) => {
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

  const handleBackClick = () => {
    setFade(false);
    setTimeout(() => {
        onBack();
    }, 500); // Wait for fade out animation
  };


  return (
    <div className={`transition-all duration-500 ease-in-out ${fade ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
      <p className="text-sm font-semibold text-accent-light dark:text-accent-dark mb-2">{question.category}</p>
      <h2 className="text-2xl md:text-3xl font-bold text-text-primary-light dark:text-text-primary-dark dark:text-text-primary-dark mb-6">
        {question.text}
      </h2>
      <div className="space-y-4">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionClick(option.score)}
            className="group flex w-full transform items-center rounded-lg border border-border-light dark:border-border-dark dark:border-border-dark bg-white dark:bg-surface-dark p-4 text-left shadow-sm transition-all duration-300 ease-in-out hover:-translate-y-1 hover:border-accent-dark dark:hover:border-accent-light hover:bg-surface-light dark:bg-surface-dark dark:hover:bg-surface-dark/80 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-accent-light focus:ring-offset-2 dark:focus:ring-offset-surface-dark"
          >
            <span className="mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md bg-accent-light/20 dark:bg-accent-dark/20 font-bold text-accent-light dark:text-accent-dark transition-colors duration-300 group-hover:bg-accent-light group-hover:text-white">
              {String.fromCharCode(65 + index)}
            </span>
            <span className="font-medium text-text-primary-light dark:text-text-primary-dark dark:text-text-primary-dark">{option.text}</span>
          </button>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-border-light dark:border-border-dark dark:border-border-dark flex justify-start">
        <button
          onClick={handleBackClick}
          disabled={questionNumber <= 1}
          className="flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold text-text-primary-light dark:text-text-primary-dark dark:text-text-primary-dark bg-surface-light dark:bg-surface-dark dark:bg-surface-dark hover:bg-surface-light dark:bg-surface-dark dark:hover:bg-surface-dark transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Kembali ke pertanyaan sebelumnya"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          <span>Kembali</span>
        </button>
      </div>

    </div>
  );
};

export default QuestionCard;