
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import QuestionCard from './components/QuestionCard';
import ProgressBar from './components/ProgressBar';
import ResultsPage from './components/ResultsPage';
import { assessmentQuestions } from './constants';
import type { Answer } from './types';
import { TOTAL_QUESTIONS } from './constants';

const App: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  const handleAnswer = useCallback((questionId: string, score: number) => {
    setAnswers(prevAnswers => [...prevAnswers, { questionId, score }]);
    
    if (currentQuestionIndex < TOTAL_QUESTIONS - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    } else {
      setIsFinished(true);
    }
  }, [currentQuestionIndex]);
  
  const restartAssessment = useCallback(() => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setIsFinished(false);
  }, []);

  const currentQuestion = assessmentQuestions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 antialiased">
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-10 transition-all duration-500">
          {!isFinished ? (
            <>
              <ProgressBar current={currentQuestionIndex + 1} total={TOTAL_QUESTIONS} />
              <QuestionCard
                question={currentQuestion}
                onAnswer={handleAnswer}
                questionNumber={currentQuestionIndex + 1}
              />
            </>
          ) : (
            <ResultsPage answers={answers} onRestart={restartAssessment} />
          )}
        </div>
        <footer className="text-center text-sm text-gray-500 mt-8">
          &copy; {new Date().getFullYear()} RICE AI Consultant. All rights reserved.
        </footer>
      </main>
    </div>
  );
};

export default App;
