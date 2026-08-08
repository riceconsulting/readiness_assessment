
import React from 'react';
import type { Assessment } from '../types';
import SampleOutput from './SampleOutput';

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
    <div className="text-center animate-fade-in-scale p-6 sm:p-10">
      <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100">Business & Technology Assessments</h2>
      <p className="text-slate-600 dark:text-slate-400 mt-4 max-w-3xl mx-auto">
        Selamat datang di pusat assessment RICE AI. Pilih salah satu alat di bawah ini untuk mendapatkan wawasan berharga tentang kesiapan strategis, operasional, dan teknis perusahaan Anda.
      </p>
      
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {assessments.map((assessment, index) => (
             <div 
                key={assessment.id} 
                className={`group relative flex flex-col text-left p-6 bg-slate-50/50 dark:bg-slate-800/20 rounded-xl border border-slate-200 dark:border-slate-700/50 shadow-sm hover:shadow-xl hover:border-accent-teal/50 dark:hover:border-accent-sky/50 transition-all duration-300 transform hover:-translate-y-1 animate-fade-in-up overflow-hidden`}
                style={{ animationDelay: `${index * 150}ms` }}
            >
                <div className="absolute -top-4 -right-4 opacity-10 dark:opacity-20 text-accent-teal group-hover:opacity-20 dark:group-hover:opacity-30 transition-opacity duration-300 transform group-hover:rotate-[-5deg] group-hover:scale-110">
                  <assessment.icon className="w-28 h-28" />
                </div>

                <div className="relative z-10 flex flex-col h-full">
                  <div className="w-12 h-12 rounded-lg bg-accent-teal/10 dark:bg-accent-sky/10 flex items-center justify-center mb-4 border border-accent-teal/20 dark:border-accent-sky/20">
                    <assessment.icon className="w-7 h-7 text-accent-teal dark:text-accent-sky" />
                  </div>
                  <h3 className="text-xl font-bold text-[#17252A] dark:text-slate-100">{assessment.title}</h3>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 flex-grow">{assessment.description}</p>
                  <div className="mt-6 flex justify-between items-center">
                      <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                          {assessment.questions.length} Pertanyaan
                      </p>
                      <button
                          onClick={() => onStart(assessment.id)}
                          className="group/btn inline-flex items-center justify-center space-x-2 text-sm font-semibold py-2 px-4 rounded-lg bg-accent-teal text-white hover:bg-[#4A7891] transition-all duration-200 shadow-md hover:shadow-lg"
                      >
                          <span>Mulai</span>
                          <ArrowRightIcon className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                      </button>
                  </div>
                </div>
            </div>
        ))}
      </div>

      <div className="mt-12 max-w-4xl mx-auto">
        <SampleOutput
          title="Sample Output: AI Readiness Assessment"
          description="Here's an example of the assessment questions and results you can expect."
        >
          <div className="space-y-4">
            <div className="bg-background-light dark:bg-background-dark rounded-lg p-4 border border-border-light dark:border-border-dark">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-medium rounded">Question 1 of 14</span>
                <span className="text-xs text-text-secondary-light dark:text-text-secondary-dark">Progress: 7%</span>
              </div>
              <p className="text-sm font-medium text-text-primary-light dark:text-text-primary-dark mb-2">Sejauh mana strategi pemanfaatan AI terintegrasi dalam rencana bisnis utama perusahaan Anda?</p>
              <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark mb-3">(How integrated is your AI utilization strategy in your company's main business plan?)</p>
              <div className="space-y-2">
                {['A - Belum ada strategi formal, masih dalam tahap eksplorasi.', 'B - Ada beberapa inisiatif sporadis, namun belum menjadi strategi terpusat.', 'C - Strategi sudah didefinisikan untuk beberapa departemen kunci.', 'D - AI dan otomasi adalah pilar utama dalam strategi bisnis jangka panjang kami.'].map((option, i) => (
                  <label key={i} className="flex items-start gap-2 p-2 rounded border border-border-light dark:border-border-dark hover:bg-surface-light dark:hover:bg-surface-dark cursor-pointer">
                    <input type="radio" name="sample-q1" className="mt-0.5" disabled />
                    <span className="text-xs text-text-primary-light dark:text-text-primary-dark">{option}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div className="bg-background-light dark:bg-background-dark rounded-lg p-4 border border-border-light dark:border-border-dark">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs font-medium rounded">Results Summary</span>
              </div>
              <div className="text-center p-4 bg-surface-light dark:bg-surface-dark rounded-lg border border-border-light dark:border-border-dark">
                <div className="text-4xl font-bold text-green-600 dark:text-green-400">65</div>
                <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">AI Readiness Score</p>
              </div>
              <div className="mt-4 space-y-3">
                <div>
                  <p className="text-xs font-medium text-text-secondary-light dark:text-text-secondary-dark mb-1">Key Findings</p>
                  <ul className="text-xs text-text-primary-light dark:text-text-primary-dark space-y-1">
                    <li>✅ Strong team enthusiasm for AI adoption</li>
                    <li>✅ Basic digital infrastructure in place</li>
                    <li>⚠️ Limited formal AI strategy</li>
                    <li>⚠️ Need for employee training programs</li>
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-medium text-text-secondary-light dark:text-text-secondary-dark mb-1">Priority Actions</p>
                  <ol className="text-xs text-text-primary-light dark:text-text-primary-dark list-decimal list-inside">
                    <li>Schedule AI strategy workshop (Q1)</li>
                    <li>Identify 3 quick-win AI use cases</li>
                    <li>Budget for AI training programs</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </SampleOutput>
      </div>

    </div>
  );
};

export default HomePage;