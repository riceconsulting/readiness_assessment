

import React, { useState, useCallback, useEffect } from 'react';
import Header from './components/Header';
import QuestionCard from './components/QuestionCard';
import ProgressBar from './components/ProgressBar';
import ResultsPage from './components/ResultsPage';
import HomePage from './components/HomePage';
import Footer from './components/Footer';
import { assessmentQuestions } from './constants';
import type { Answer } from './types';

type AssessmentState = 'home' | 'assessment' | 'results';
type Theme = 'light' | 'dark';

const App: React.FC = () => {
  const [assessmentState, setAssessmentState] = useState<AssessmentState>('home');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      // Respect user's stored preference, but default to light mode otherwise.
      if (localStorage.theme === 'dark') {
        return 'dark';
      }
    }
    return 'light';
  });
  const [isSharedView, setIsSharedView] = useState(false);
  
  // State to track if the intro animation has been played in the current session.
  const [isIntroPlayed, setIsIntroPlayed] = useState(() => {
    if (typeof window !== 'undefined') {
      // Check session storage to prevent animation on refresh.
      return !!sessionStorage.getItem('introAnimationPlayed');
    }
    return true; 
  });

  // Effect to set the session flag after the first visit's animation.
  useEffect(() => {
    if (!isIntroPlayed) {
      sessionStorage.setItem('introAnimationPlayed', 'true');
    }
  }, [isIntroPlayed]);

  useEffect(() => {
    const root = window.document.documentElement;
    // Explicitly add or remove only the 'dark' class for robustness.
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);
  
  // On initial load, check for shared results in URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const resultsParam = urlParams.get('results');

    if (resultsParam) {
        try {
            const decodedString = atob(resultsParam);
            const scores = decodedString.split(',').map(Number);
            
            if (scores.length === assessmentQuestions.length) {
                const sharedAnswers = assessmentQuestions.map((question, index) => ({
                    questionId: question.id,
                    score: scores[index] || 0,
                }));
                setAnswers(sharedAnswers);
                setAssessmentState('results');
                setIsSharedView(true);
            } else {
                 console.error('Shared results data is malformed.');
            }
        } catch (error) {
            console.error('Failed to decode shared results:', error);
        }
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  }, []);

  const handleAnswer = useCallback((questionId: string, score: number) => {
    setAnswers(prevAnswers => [...prevAnswers, { questionId, score }]);
    
    if (currentQuestionIndex < assessmentQuestions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    } else {
      setAssessmentState('results');
    }
  }, [currentQuestionIndex]);
  
  const handleBack = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prevIndex => prevIndex - 1);
      // Remove the last answer when going back
      setAnswers(prevAnswers => prevAnswers.slice(0, -1));
    }
  }, [currentQuestionIndex]);

  const startAssessment = useCallback(() => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setAssessmentState('assessment');
  }, []);

  const restartAssessment = useCallback(() => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setAssessmentState('home');
    setIsSharedView(false);
    // Clean the URL
    window.history.pushState({}, document.title, window.location.pathname);
  }, []);

  const currentQuestion = assessmentQuestions[currentQuestionIndex];
  const totalQuestions = assessmentQuestions.length;

  const renderContent = () => {
    switch (assessmentState) {
      case 'home':
        return <HomePage onStart={startAssessment} totalQuestions={totalQuestions} />;
      case 'assessment':
        return (
          <>
            <ProgressBar current={currentQuestionIndex + 1} total={totalQuestions} />
            <QuestionCard
              question={currentQuestion}
              onAnswer={handleAnswer}
              onBack={handleBack}
              questionNumber={currentQuestionIndex + 1}
            />
          </>
        );
      case 'results':
        return <ResultsPage 
                    answers={answers} 
                    onRestart={restartAssessment} 
                    questions={assessmentQuestions} 
                    isSharedView={isSharedView} 
                />;
      default:
        return <HomePage onStart={startAssessment} totalQuestions={totalQuestions}/>;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 dark:bg-[#17252A] dark:text-slate-200 antialiased">
      <Header 
        theme={theme}
        toggleTheme={toggleTheme}
      />
      <main className="container mx-auto px-4 py-8 max-w-4xl sm:pb-24">
        <div 
          key={assessmentState} 
          className={`bg-white dark:bg-[#1A2E35] rounded-2xl shadow-lg p-6 sm:p-10 transition-all duration-500 ${!isIntroPlayed && assessmentState === 'home' ? 'animate-intro' : 'animate-fade-in-scale'}`}
        >
          {renderContent()}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;