
import React from 'react';
import type { Assessment } from '../types';

interface HomePageProps {
  onStart: (assessmentId: string) => void;
  assessments: Assessment[];
}

const ArrowRightIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
);


const HomePage: React.FC<HomePageProps> = ({ onStart, assessments }) => {
  return (
    <div className="text-center animate-fade-in-scale">
      <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100">Business & Technology Assessments</h2>
      <p className="text-slate-600 dark:text-slate-400 mt-4 max-w-3xl mx-auto">
        Selamat datang di pusat assessment RICE AI. Pilih salah satu alat di bawah ini untuk mendapatkan wawasan berharga tentang kesiapan strategis, operasional, dan teknis perusahaan Anda.
      </p>
      
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {assessments.map((assessment, index) => (
             <div 
                key={assessment.id} 
                className={`flex flex-col text-left p-6 bg-slate-50/50 dark:bg-slate-800/20 rounded-xl border border-slate-200 dark:border-slate-700/50 shadow-sm hover:shadow-lg hover:border-[#9BBBCC] dark:hover:border-[#5890AD] transition-all duration-300 transform hover:-translate-y-1 animate-fade-in-up`}
                style={{ animationDelay: `${index * 150}ms` }}
            >
                <h3 className="text-xl font-bold text-[#17252A] dark:text-slate-100">{assessment.title}</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 flex-grow">{assessment.description}</p>
                <div className="mt-6 flex justify-between items-center">
                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                        {assessment.questions.length} Pertanyaan
                    </p>
                    <button
                        onClick={() => onStart(assessment.id)}
                        className="group inline-flex items-center justify-center space-x-2 text-sm font-semibold py-2 px-4 rounded-lg bg-accent-teal text-white hover:bg-[#4A7891] transition-all duration-200"
                    >
                        <span>Mulai</span>
                        <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </button>
                </div>
            </div>
        ))}
      </div>

    </div>
  );
};

export default HomePage;