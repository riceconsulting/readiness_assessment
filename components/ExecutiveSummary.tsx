import React from 'react';

interface ExecutiveSummaryProps {
  summary: string;
  isGenerated: boolean;
  isLoading: boolean;
  error: string | null;
  onGenerate: () => void;
  onOpenChat: () => void;
}

const SparklesIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" />
    </svg>
);

const LoadingSkeleton: React.FC = () => (
  <div className="space-y-4 animate-pulse">
    <div className="space-y-2">
      <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full"></div>
      <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-5/6"></div>
    </div>
     <div className="space-y-2">
      <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full"></div>
      <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-4/6"></div>
       <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-5/6"></div>
    </div>
     <div className="space-y-2">
      <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/6"></div>
      <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full"></div>
    </div>
  </div>
);

const ExecutiveSummary: React.FC<ExecutiveSummaryProps> = ({ summary, isGenerated, isLoading, error, onGenerate, onOpenChat }) => {
  const renderContent = () => {
    if (isLoading) {
      return <LoadingSkeleton />;
    }
    if (error) {
      return <p className="text-sm text-red-600 dark:text-red-400 text-center">{error}</p>;
    }
    if (isGenerated) {
      return (
        <>
          <blockquote 
            className="prose prose-sm dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 space-y-4 border-l-4 border-accent-teal/50 pl-4 italic"
          >
            {summary.split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </blockquote>
          <div className="mt-6 text-center">
            <button
              onClick={onOpenChat}
              className="inline-flex items-center justify-center space-x-2 text-sm font-semibold py-2 px-4 rounded-lg bg-slate-100 dark:bg-slate-800 text-accent-teal dark:text-accent-sky hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-200"
            >
              <SparklesIcon className="w-5 h-5" />
              <span>Diskusikan Lebih Lanjut dengan AI</span>
            </button>
          </div>
        </>
      );
    }
    // Initial state: "Generate" button
    return (
      <div className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-6">
        <div className="flex-shrink-0 grid place-content-center w-20 h-20 rounded-full bg-gradient-to-br from-accent-sky/20 to-accent-teal/20">
            <SparklesIcon className="w-10 h-10 text-accent-teal" />
        </div>
        <div className="flex-grow">
            <p className="text-base font-semibold text-slate-800 dark:text-slate-200">Buka Wawasan Berbasis AI</p>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                Hasilkan ringkasan eksekutif yang dipersonalisasi dan wawasan yang dapat ditindaklanjuti berdasarkan hasil Anda.
            </p>
        </div>
        <button
          onClick={onGenerate}
          disabled={isLoading}
          className="w-full sm:w-auto flex-shrink-0 transform bg-[#5890AD] text-white font-bold py-2.5 px-6 rounded-lg hover:bg-[#4A7891] transition-all duration-300 flex items-center justify-center space-x-2 shadow-md hover:shadow-lg hover:-translate-y-px disabled:bg-[#9BBBCC] disabled:cursor-not-allowed"
        >
          <SparklesIcon className="w-5 h-5" />
          <span>Buat Ringkasan</span>
        </button>
      </div>
    );
  };

  return (
    <div className="relative rounded-lg p-1 bg-gradient-to-br from-accent-sky/50 via-accent-teal/50 to-primary-navy/50 shadow-lg">
      <div className="bg-white dark:bg-[#1A2E35] rounded-md p-6">
        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-4 flex items-center">
            <SparklesIcon className="w-6 h-6 mr-3 text-[#5890AD]" />
            Executive Summary
        </h3>
        {renderContent()}
      </div>
    </div>
  );
};

export default ExecutiveSummary;