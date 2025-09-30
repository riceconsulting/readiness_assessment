

import React, { useState, useCallback, useEffect } from 'react';
import Header from './components/Header';
import QuestionCard from './components/QuestionCard';
import ProgressBar from './components/ProgressBar';
import ResultsPage from './components/ResultsPage';
import HomePage from './components/HomePage';
import Footer from './components/Footer';
import { assessments } from './constants';
import type { Answer, Assessment } from './types';

type AssessmentState = 'home' | 'assessment' | 'results';
type Theme = 'light' | 'dark';

const App: React.FC = () => {
  const [assessmentState, setAssessmentState] = useState<AssessmentState>('home');
  const [selectedAssessment, setSelectedAssessment] = useState<Assessment | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      if (localStorage.theme === 'dark') {
        return 'dark';
      }
    }
    return 'light';
  });
  
  const [isIntroPlayed, setIsIntroPlayed] = useState(() => {
    if (typeof window !== 'undefined') {
      return !!sessionStorage.getItem('introAnimationPlayed');
    }
    return true; 
  });

  useEffect(() => {
    if (!isIntroPlayed) {
      sessionStorage.setItem('introAnimationPlayed', 'true');
    }
  }, [isIntroPlayed]);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);
  

  const toggleTheme = useCallback(() => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  }, []);

  const handleAnswer = useCallback((questionId: string, score: number) => {
    if (!selectedAssessment) return;
    setAnswers(prevAnswers => [...prevAnswers, { questionId, score }]);
    
    if (currentQuestionIndex < selectedAssessment.questions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    } else {
      setAssessmentState('results');
    }
  }, [currentQuestionIndex, selectedAssessment]);
  
  const handleBack = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prevIndex => prevIndex - 1);
      setAnswers(prevAnswers => prevAnswers.slice(0, -1));
    }
  }, [currentQuestionIndex]);

  const startAssessment = useCallback((assessmentId: string) => {
    const assessment = assessments.find(a => a.id === assessmentId);
    if (assessment) {
        setSelectedAssessment(assessment);
        setCurrentQuestionIndex(0);
        setAnswers([]);
        setAssessmentState('assessment');
    }
  }, []);

  const restartAssessment = useCallback(() => {
    setSelectedAssessment(null);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setAssessmentState('home');
    // Fix: Replaced history.pushState with a safer method to avoid SecurityError on blob URLs.
    // This creates a new URL object from the current location, removes the search parameters,
    // and then uses replaceState to update the URL without creating a new history entry.
    try {
        const url = new URL(window.location.href);
        url.search = '';
        window.history.replaceState({}, document.title, url.toString());
    } catch (error) {
        console.error("Could not clean URL:", error);
        // Fallback for very restrictive environments: redirect to the base path.
        window.location.href = window.location.origin + window.location.pathname;
    }
  }, []);

  const currentQuestion = selectedAssessment?.questions[currentQuestionIndex];
  const totalQuestions = selectedAssessment?.questions.length ?? 0;

  const renderContent = () => {
    switch (assessmentState) {
      case 'home':
        return <HomePage onStart={startAssessment} assessments={assessments} />;
      case 'assessment':
        if (!currentQuestion || !selectedAssessment) return null;
        return (
          <div className="p-6 sm:p-10">
            <ProgressBar current={currentQuestionIndex + 1} total={totalQuestions} />
            <QuestionCard
              question={currentQuestion}
              onAnswer={handleAnswer}
              onBack={handleBack}
              questionNumber={currentQuestionIndex + 1}
            />
          </div>
        );
      case 'results':
        if (!selectedAssessment) return null;
        return <ResultsPage 
                    answers={answers} 
                    onRestart={restartAssessment} 
                    assessment={selectedAssessment}
                />;
      default:
        return <HomePage onStart={startAssessment} assessments={assessments}/>;
    }
  };
  
  const getHeaderSubtitle = () => {
    if (assessmentState === 'home' || !selectedAssessment) {
        return 'Business & Technology Assessments';
    }
    return selectedAssessment.subtitle;
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 dark:bg-[#17252A] dark:text-slate-200 antialiased">
      <Header 
        theme={theme}
        toggleTheme={toggleTheme}
        subtitle={getHeaderSubtitle()}
      />
      <main className="container mx-auto px-4 py-8 max-w-4xl sm:pb-24">
        <div 
          key={assessmentState} 
          className={`bg-white dark:bg-[#1A2E35] rounded-2xl shadow-lg transition-all duration-500 ${!isIntroPlayed && assessmentState === 'home' ? 'animate-intro' : 'animate-fade-in-scale'}`}
        >
          {renderContent()}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;