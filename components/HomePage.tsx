
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
          sampleData={[
            {
              label: 'Assessment Question Example',
              content: `❓ **Question 1 of 14**\n\nSejauh mana strategi pemanfaatan AI terintegrasi dalam rencana bisnis utama perusahaan Anda?\n\n(How integrated is your AI utilization strategy in your company's main business plan?)\n\n**Options:**\n• A - Belum ada strategi formal, masih dalam tahap eksplorasi.\n• B - Ada beberapa inisiatif sporadis, namun belum menjadi strategi terpusat.\n• C - Strategi sudah didefinisikan untuk beberapa departemen kunci.\n• D - AI dan otomasi adalah pilar utama dalam strategi bisnis jangka panjang kami.\n\n📊 **Progress:** 7% (1 of 14 questions)`
            },
            {
              label: 'Sample Results Summary',
              content: `📈 **AI Readiness Score: 65/100**\n\n**Key Findings:**\n• Strong team enthusiasm for AI adoption\n• Basic digital infrastructure in place\n• Limited formal AI strategy\n• Need for employee training programs\n\n**Recommendations:**\n1. Develop a formal AI strategy document\n2. Invest in employee AI literacy training\n3. Start with low-risk AI pilot projects\n4. Establish data governance framework\n\n**Priority Actions:**\n• Schedule AI strategy workshop (Q1)\n• Identify 3 quick-win AI use cases\n• Budget for AI training programs`
            }
          ]}
        />
      </div>

    </div>
  );
};

export default HomePage;