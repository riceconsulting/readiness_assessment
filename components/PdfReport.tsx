import React from 'react';
import type { Answer, Question, ChatMessage, ResultLevel } from '../types';
import RadarChart from './RadarChart';

interface PdfReportProps {
  result: ResultLevel;
  totalScore: number;
  totalMaxScore: number;
  categoryScores: Record<string, { score: number; maxScore: number; questionCount?: number }>;
  categoryOrder: string[];
  summary: string;
  messages: ChatMessage[];
  answers: Answer[];
  questions: Question[];
}

// Helper to chunk an array for pagination
const chunkArray = <T,>(array: T[], size: number): T[][] => {
  const chunkedArr: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunkedArr.push(array.slice(i, i + size));
  }
  return chunkedArr;
};

// Internal components for PDF structure
const PageHeader: React.FC = () => (
  <header className="flex justify-between items-center border-b-2 pb-4 border-slate-300 flex-shrink-0">
    <div className="flex items-center space-x-3">
      <img 
        src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,fit=crop,q=95/AGB2yyJJKXfD527r/rice-ai-consulting-2-AoPWxvnWOju2GwOz.png" 
        alt="RICE AI Logo" 
        className="h-14 w-14 object-contain" 
      />
      <div>
        <h1 className="font-bold text-2xl text-[#17252A]">RICE AI Consultant</h1>
        <p className="text-sm text-[#5890AD]">Business & Technology Readiness Report</p>
      </div>
    </div>
    <p className="text-sm text-slate-500">{new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
  </header>
);

const PageFooter: React.FC<{ currentPage: number; totalPages: number }> = ({ currentPage, totalPages }) => (
  <footer className="mt-auto pt-4 border-t border-slate-200 text-center flex-shrink-0">
    <p className="text-xs text-slate-500">
      Readiness Report by RICE AI Consultant | Halaman {currentPage} dari {totalPages}
    </p>
  </footer>
);


const PdfReport: React.FC<PdfReportProps> = ({
  result,
  totalScore,
  totalMaxScore,
  categoryScores,
  categoryOrder,
  summary,
  messages,
  answers,
  questions,
}) => {
  const scorePercentage = totalMaxScore > 0 ? (totalScore / totalMaxScore) * 100 : 0;

  const getAnswerDetails = (questionId: string) => {
    const question = questions.find(q => q.id === questionId);
    const answer = answers.find(a => a.questionId === questionId);
    if (!question || !answer) return { text: 'N/A', score: 0 };
    const selectedOption = question.options.find(o => o.score === answer.score);
    return {
      text: selectedOption?.text || "Tidak terjawab",
      score: answer.score,
    };
  };

  const pages = [];
  const colorMap: Record<string, string> = {
    'Tahap Awal (Foundation)': '#EF4444',
    'Level Reaktif (Reactive)': '#EF4444',
    'Tahap Pengembangan (Developing)': '#F59E0B',
    'Level Proaktif (Proactive)': '#F59E0B',
    'Tahap Pematangan (Maturing)': '#5890AD',
    'Level Teroptimasi (Optimized)': '#5890AD',
  };
  const scoreColor = colorMap[result.title] || '#5890AD';

  // Page 1: Cover Page with Overall Results
  pages.push(
    <div key="page-cover">
      <h2 className="text-center text-2xl font-bold text-[#17252A] mb-8">Laporan Hasil Assessment</h2>
      <div className="grid grid-cols-2 gap-8 items-start">
        <div className="text-center flex flex-col items-center justify-center pt-6">
          <h3 className="text-lg font-semibold text-slate-700">Skor Kesiapan Anda</h3>
          <div className="relative w-48 h-48 mx-auto mt-4">
            <svg className="w-full h-full" viewBox="0 0 36 36" transform="rotate(-90)">
              <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#e2e8f0" strokeWidth="3" />
              <circle
                cx="18"
                cy="18"
                r="15.9155"
                fill="none"
                stroke={scoreColor}
                strokeWidth="3.5"
                strokeDasharray={`${scorePercentage}, 100`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-5xl font-extrabold text-slate-800">{totalScore}</span>
              <span className="text-sm text-slate-500">/ {totalMaxScore}</span>
            </div>
          </div>
          <h3 className="text-2xl font-bold mt-4" style={{ color: scoreColor }}>{result.title}</h3>
          <p className="mt-2 text-sm text-slate-600 max-w-sm mx-auto">{result.description}</p>
        </div>
        <div style={{ height: '320px', width: '320px', margin: '0 auto' }}>
          <RadarChart scores={categoryScores} categoryOrder={categoryOrder} onWhyClick={() => {}} isMounted={true} />
        </div>
      </div>
    </div>
  );

  // Page 2: AI Summary and/or Chat Transcript
  if (summary || (messages && messages.length > 1)) {
    pages.push(
      <div key="page-summary-chat">
        {summary && (
          <section>
            <h2 className="text-xl font-bold text-[#17252A] mb-3">Executive Summary (AI-Generated)</h2>
            <div className="text-sm text-slate-700 bg-slate-50 p-4 rounded-lg space-y-3 border border-slate-200">
              {summary.split('\n\n').map((paragraph, index) => <p key={index}>{paragraph}</p>)}
            </div>
          </section>
        )}
        {messages && messages.length > 1 && (
          <section className={summary ? "mt-8" : ""}>
            <h2 className="text-xl font-bold text-[#17252A] mb-3">Transkrip Konsultasi AI</h2>
            <div className="space-y-3 text-xs p-4 bg-slate-50 rounded-lg border border-slate-200">
              {messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`p-2 rounded-lg max-w-[80%] ${msg.sender === 'user' ? 'bg-[#5890AD]/20' : 'bg-slate-200'}`}>
                    <strong className="font-bold text-[#17252A]">{msg.sender === 'user' ? 'Anda' : 'AI Konsultan'}:</strong>
                    <p className="mt-1 whitespace-pre-wrap text-slate-700">{msg.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    );
  }

  // Page 3: Recommendations
  pages.push(
    <div key="page-recommendations">
      <section>
        <h2 className="text-xl font-bold text-[#17252A] mb-3">Rekomendasi Langkah Berikutnya</h2>
        <ul className="space-y-3">
          {result.recommendations.map((rec, index) => (
            <li key={index} className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <p className="font-semibold text-sm text-[#17252A]">{rec.text}</p>
              <p className="text-xs text-slate-600 mt-1">{rec.explanation}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );

  // Subsequent Pages: Detailed Answers
  const ANSWERS_PER_PAGE = 5;
  const answerPages = chunkArray(questions, ANSWERS_PER_PAGE);
  answerPages.forEach((answerChunk, index) => {
    pages.push(
      <div key={`page-answers-${index}`}>
        <section>
          <h2 className="text-xl font-bold text-[#17252A] mb-3">
            Laporan Rinci Jawaban Anda {answerPages.length > 1 ? `(Bagian ${index + 1} dari ${answerPages.length})` : ''}
          </h2>
          <div className="space-y-4">
            {answerChunk.map((q: Question) => (
              <div key={q.id} className="p-3 bg-slate-50 rounded-md border border-slate-200 text-sm">
                <p className="text-xs font-semibold text-[#5890AD]">{q.category}</p>
                <p className="font-medium text-slate-700 mt-1">{q.text}</p>
                <p className="text-xs text-slate-500 mt-2">
                  <strong>Jawaban Anda:</strong> {getAnswerDetails(q.id).text} (Skor: {getAnswerDetails(q.id).score}/4)
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  });
  
  const totalPages = pages.length;

  return (
    <div id="pdf-render-content" style={{ width: '800px', backgroundColor: '#f1f5f9', fontFamily: 'Poppins, sans-serif' }}>
        <div className="p-4">
            {pages.map((pageContent, index) => (
                <div 
                    key={index} 
                    className="bg-white p-10 shadow-lg" 
                    style={{ 
                        minHeight: '1100px', 
                        display: 'flex', 
                        flexDirection: 'column', 
                        marginBottom: index === totalPages - 1 ? 0 : '1rem' 
                    }}
                >
                    <PageHeader />
                    <main className="mt-8 flex-grow">
                        {pageContent}
                    </main>
                    <PageFooter currentPage={index + 1} totalPages={totalPages} />
                </div>
            ))}
        </div>
    </div>
  );
};

export default PdfReport;