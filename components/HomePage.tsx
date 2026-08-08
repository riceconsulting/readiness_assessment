
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
      <h2 className="text-3xl font-bold text-text-primary-light dark:text-text-primary-dark">Business & Technology Assessments</h2>
      <p className="text-text-secondary-light dark:text-text-secondary-dark mt-4 max-w-3xl mx-auto">
        Selamat datang di pusat assessment RICE AI. Pilih salah satu alat di bawah ini untuk mendapatkan wawasan berharga tentang kesiapan strategis, operasional, dan teknis perusahaan Anda.
      </p>
      
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {assessments.map((assessment, index) => (
             <div 
                key={assessment.id} 
                className={`group relative flex flex-col text-left p-6 bg-surface-light/50 dark:bg-surface-dark/20 rounded-xl border border-border-light dark:border-border-dark/50 shadow-sm hover:shadow-xl hover:border-accent-teal/50 dark:hover:border-accent-sky/50 transition-all duration-300 transform hover:-translate-y-1 animate-fade-in-up overflow-hidden`}
                style={{ animationDelay: `${index * 150}ms` }}
            >
                <div className="absolute -top-4 -right-4 opacity-10 dark:opacity-20 text-accent-teal group-hover:opacity-20 dark:group-hover:opacity-30 transition-opacity duration-300 transform group-hover:rotate-[-5deg] group-hover:scale-110">
                  <assessment.icon className="w-28 h-28" />
                </div>

                <div className="relative z-10 flex flex-col h-full">
                  <div className="w-12 h-12 rounded-lg bg-accent-teal/10 dark:bg-accent-sky/10 flex items-center justify-center mb-4 border border-accent-teal/20 dark:border-accent-sky/20">
                    <assessment.icon className="w-7 h-7 text-accent-teal dark:text-accent-sky" />
                  </div>
                  <h3 className="text-xl font-bold text-text-primary-light dark:text-text-primary-dark">{assessment.title}</h3>
                  <p className="mt-2 text-sm text-text-secondary-light dark:text-text-secondary-dark flex-grow">{assessment.description}</p>
                  <div className="mt-6 flex justify-between items-center">
                      <p className="text-xs font-medium text-text-secondary-light dark:text-text-secondary-dark">
                          {assessment.questions.length} Pertanyaan
                      </p>
                      <button
                          onClick={() => onStart(assessment.id)}
                          className="group/btn inline-flex items-center justify-center space-x-2 text-sm font-semibold py-2 px-4 rounded-lg bg-accent-teal text-white hover:brightness-95 transition-all duration-200 shadow-md hover:shadow-lg"
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
          title="Sample Results: PT Bank Central Asia Tbk"
          description="This is what the final assessment results look like after completing all questions."
        >
          <div className="space-y-4">
            <div className="bg-background-light dark:bg-background-dark rounded-lg p-6 border border-border-light dark:border-border-dark">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="text-lg font-bold text-text-primary-light dark:text-text-primary-dark">PT Bank Central Asia Tbk</h4>
                  <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">Assessment completed on 15 Januari 2024</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400">78</div>
                  <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">AI Readiness Score</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
                {[
                  { label: 'Strategi', score: 85, color: 'bg-green-500' },
                  { label: 'Infrastruktur', score: 72, color: 'bg-blue-500' },
                  { label: 'Tim', score: 80, color: 'bg-purple-500' },
                  { label: 'Proses', score: 75, color: 'bg-amber-500' }
                ].map((item, i) => (
                  <div key={i} className="text-center">
                    <div className="w-full bg-border-light dark:bg-border-dark rounded-full h-2 mb-1">
                      <div className={`${item.color} h-2 rounded-full`} style={{ width: `${item.score}%` }}></div>
                    </div>
                    <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">{item.label}</p>
                    <p className="text-sm font-bold text-text-primary-light dark:text-text-primary-dark">{item.score}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-background-light dark:bg-background-dark rounded-lg p-4 border border-border-light dark:border-border-dark">
              <p className="text-xs font-medium text-text-secondary-light dark:text-text-secondary-dark mb-2">🎯 Key Findings</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded">
                  <p className="text-xs font-medium text-green-700 dark:text-green-300">Strengths</p>
                  <ul className="text-xs text-text-primary-light dark:text-text-primary-dark mt-1 space-y-1">
                    <li>• Tim IT berpengalaman</li>
                    <li>• Infrastruktur cloud hybrid</li>
                    <li>• Budaya inovasi kuat</li>
                  </ul>
                </div>
                <div className="p-2 bg-amber-50 dark:bg-amber-900/20 rounded">
                  <p className="text-xs font-medium text-amber-700 dark:text-amber-300">Improvements</p>
                  <ul className="text-xs text-text-primary-light dark:text-text-primary-dark mt-1 space-y-1">
                    <li>• Kurangnya AI governance</li>
                    <li>• Data silo antar divisi</li>
                    <li>• Training kurang terstruktur</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-background-light dark:bg-background-dark rounded-lg p-4 border border-border-light dark:border-border-dark">
              <p className="text-xs font-medium text-text-secondary-light dark:text-text-secondary-dark mb-2">📋 Recommendations</p>
              <div className="space-y-2">
                {[
                  { priority: 'High', action: 'Bentuk AI Governance Committee', timeline: 'Q1 2024' },
                  { priority: 'High', action: 'Implementasi data integration platform', timeline: 'Q2 2024' },
                  { priority: 'Medium', action: 'Program training AI untuk 100 karyawan', timeline: 'Q3 2024' },
                  { priority: 'Low', action: 'Pilot project AI untuk customer service', timeline: 'Q4 2024' }
                ].map((rec, i) => (
                  <div key={i} className="flex items-center gap-2 p-2 bg-surface-light dark:bg-surface-dark rounded">
                    <span className={`px-1.5 py-0.5 text-xs rounded ${rec.priority === 'High' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300' : rec.priority === 'Medium' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300' : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'}`}>{rec.priority}</span>
                    <span className="text-xs text-text-primary-light dark:text-text-primary-dark flex-grow">{rec.action}</span>
                    <span className="text-xs text-text-secondary-light dark:text-text-secondary-dark">{rec.timeline}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-center">
              <button className="px-4 py-2 bg-accent-teal text-white rounded-lg text-sm font-medium hover:brightness-95 transition-colors">
                ← Start New Assessment
              </button>
            </div>
          </div>
        </SampleOutput>
      </div>

    </div>
  );
};

export default HomePage;