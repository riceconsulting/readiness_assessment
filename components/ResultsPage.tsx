
import React, { useMemo, useRef, useState, useEffect } from 'react';
import type { Answer, Question } from '../types';
import { resultLevels, assessmentQuestions, MAX_SCORE_PER_QUESTION, scoreExplanations, getScoreTier } from '../constants';
import CategoryScoresChart from './CategoryScoresChart';
import CategoryDetailModal from './CategoryDetailModal';

declare var html2canvas: any;
declare var jspdf: any;

interface ResultsPageProps {
  answers: Answer[];
  onRestart: () => void;
  questions: Question[];
}

const ResultsPage: React.FC<ResultsPageProps> = ({ answers, onRestart, questions }) => {
  const totalScore = useMemo(() => answers.reduce((sum, answer) => sum + answer.score, 0), [answers]);
  const resultRef = useRef<HTMLDivElement>(null);
  const [expandedRecommendation, setExpandedRecommendation] = useState<number | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [modalData, setModalData] = useState<{
    isOpen: boolean;
    category?: string;
    score?: number;
    maxScore?: number;
    title?: string;
    explanation?: string;
  }>({ isOpen: false });
  const [isExporting, setIsExporting] = useState(false);
  const [exportMessage, setExportMessage] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const totalMaxScore = questions.length * MAX_SCORE_PER_QUESTION;

  useEffect(() => {
    const timeoutId = setTimeout(() => setIsMounted(true), 100);
    return () => clearTimeout(timeoutId);
  }, []);

  const handleToggleRecommendation = (index: number) => {
    setExpandedRecommendation(prev => (prev === index ? null : index));
  };

  const categoryScores = useMemo(() => {
    const scores: Record<string, { score: number; maxScore: number; questionCount: number }> = {};
    
    questions.forEach(q => {
      if (!scores[q.category]) {
        scores[q.category] = { score: 0, maxScore: 0, questionCount: 0 };
      }
      
      const answer = answers.find(a => a.questionId === q.id);
      
      if (answer) {
        scores[q.category].score += answer.score;
      }
      scores[q.category].questionCount += 1;
      scores[q.category].maxScore += MAX_SCORE_PER_QUESTION;
    });
    
    return scores;
  }, [answers, questions]);

  const handleWhyClick = (category: string) => {
    const categoryData = categoryScores[category];
    if (!categoryData) return;

    const tier = getScoreTier(categoryData.score, categoryData.maxScore);
    const explanationContent = scoreExplanations[category]?.[tier];
    if (!explanationContent) return;
    
    setModalData({
      isOpen: true,
      category: category,
      score: categoryData.score,
      maxScore: categoryData.maxScore,
      title: explanationContent.title,
      explanation: explanationContent.explanation,
    });
  };

  const handleCloseModal = () => {
    setModalData({ isOpen: false });
  };

  const result = useMemo(() => {
    if (questions.length === 0) return resultLevels[0];

    const originalTotalMaxScore = assessmentQuestions.length * MAX_SCORE_PER_QUESTION;
    const scaledScore = (totalScore / totalMaxScore) * originalTotalMaxScore;
    
    return resultLevels.find(level => scaledScore >= level.minScore && scaledScore <= level.maxScore) || resultLevels[0];
  }, [totalScore, questions, totalMaxScore]);

  const scorePercentage = totalMaxScore > 0 ? (totalScore / totalMaxScore) * 100 : 0;

  const handleExportPDF = () => {
    if (!resultRef.current || isExporting) return;
    
    setIsExporting(true);
    setExportMessage(null);
    const { jsPDF } = jspdf;
  
    html2canvas(resultRef.current, {
      scale: 2,
      onclone: (clonedDoc: Document) => {
        // Force light theme for PDF rendering
        clonedDoc.documentElement.classList.remove('dark');
        
        const explanationContainers = clonedDoc.querySelectorAll<HTMLElement>('[data-explanation-container]');
        explanationContainers.forEach(container => {
          container.style.maxHeight = 'none';
          container.style.overflow = 'visible';
        });
      }
    }).then((canvas: any) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
  
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const margin = 15;
  
      pdf.setFontSize(12);
      pdf.setTextColor(40, 40, 40);
      pdf.text('RICE AI Consultant - AI Readiness Assessment Result', margin, margin);
      pdf.setLineWidth(0.2);
      pdf.line(margin, margin + 4, pdfWidth - margin, margin + 4);
  
      const footerY = pdfHeight - margin + 5;
      pdf.setFontSize(8);
      pdf.setTextColor(150, 150, 150);
      pdf.text(`© ${new Date().getFullYear()} RICE AI Consultant. All rights reserved.`, margin, footerY);
      pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, pdfWidth - margin, footerY, { align: 'right' });
  
      const contentStartY = margin + 10;
      const contentAvailableWidth = pdfWidth - (margin * 2);
      const contentAvailableHeight = pdfHeight - contentStartY - (margin + 5);
  
      const canvasAspectRatio = canvas.width / canvas.height;
  
      let finalImgWidth = contentAvailableWidth;
      let finalImgHeight = finalImgWidth / canvasAspectRatio;
  
      if (finalImgHeight > contentAvailableHeight) {
        finalImgHeight = contentAvailableHeight;
        finalImgWidth = finalImgHeight * canvasAspectRatio;
      }
  
      const contentStartX = margin + (contentAvailableWidth - finalImgWidth) / 2;
  
      pdf.addImage(imgData, 'PNG', contentStartX, contentStartY, finalImgWidth, finalImgHeight);
  
      pdf.save('RICE-AI-Readiness-Assessment-Result.pdf');
      setExportMessage({ type: 'success', message: 'PDF successfully generated!' });
    }).catch((error: any) => {
      console.error("PDF Export Error:", error);
      setExportMessage({ type: 'error', message: 'Failed to generate PDF. Please try again.' });
    }).finally(() => {
        setIsExporting(false);
        setTimeout(() => setExportMessage(null), 4000);
    });
  };

  const CheckCircleIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className} aria-hidden="true">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
  );

  const ChevronDownIcon: React.FC<{ className?: string }> = ({ className }) => (
     <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
     </svg>
  );

  return (
    <>
      <div className={`transition-all duration-700 ease-out ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
        <div ref={resultRef} className="p-8 bg-white dark:bg-[#1A2E35]">
          <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 text-center">Hasil Assessment Anda</h2>
          <p className="text-slate-600 dark:text-slate-400 mt-2 text-center">Berikut adalah ringkasan kesiapan AI dan Otomasi di perusahaan Anda.</p>

          <div className="my-10" role="region" aria-label="Ringkasan Skor Akhir">
            <div className="relative w-56 h-56 mx-auto">
              <svg className="w-full h-full" viewBox="0 0 36 36" transform="rotate(-90)" aria-hidden="true">
                <circle
                  className="text-slate-200 dark:text-slate-700"
                  cx="18"
                  cy="18"
                  r="15.9155"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="5"
                />
                <circle
                  className={`${result.color.replace('text-', 'stroke-')}`}
                  cx="18"
                  cy="18"
                  r="15.9155"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeDasharray={`${isMounted ? scorePercentage : 0}, 100`}
                  strokeLinecap="round"
                  style={{ transition: 'stroke-dasharray 1s ease-out' }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-5xl font-bold text-slate-800 dark:text-slate-100">{totalScore}</span>
                <span className="text-base text-slate-500 dark:text-slate-400">/ {totalMaxScore}</span>
              </div>
            </div>
          </div>

          <div className="text-center">
            <h3 className={`text-2xl font-bold ${result.color}`}>{result.title}</h3>
            <p className="mt-2 text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">{result.description}</p>
          </div>
          

          <CategoryScoresChart scores={categoryScores} onWhyClick={handleWhyClick} />

          <div className="mt-8 text-left bg-[#5890AD]/10 dark:bg-[#9BBBCC]/10 dark:border dark:border-[#5890AD]/30 p-6 rounded-lg">
            <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2">Rekomendasi Langkah Berikutnya:</h4>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Klik setiap rekomendasi untuk melihat penjelasan detail.</p>
            <ul className="space-y-3">
              {result.recommendations.map((rec, index) => (
                <li key={index} className="bg-white dark:bg-slate-700/50 rounded-md shadow-sm overflow-hidden transition-shadow duration-300 hover:shadow-md">
                  <button
                    onClick={() => handleToggleRecommendation(index)}
                    className="w-full text-left p-4 hover:bg-slate-50 dark:hover:bg-slate-700 focus:bg-slate-50 dark:focus:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-[#9BBBCC] dark:focus:ring-[#5890AD] transition-colors duration-200"
                    aria-expanded={expandedRecommendation === index}
                    aria-controls={`recommendation-explanation-${index}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-start">
                          <CheckCircleIcon className="w-5 h-5 text-[#5890AD] mr-3 flex-shrink-0 mt-0.5" />
                          <span className="flex-1 text-slate-800 dark:text-slate-200 font-medium">{rec.text}</span>
                      </div>
                      <ChevronDownIcon
                          className={`w-5 h-5 text-slate-400 ml-2 transform transition-transform duration-300 ${
                          expandedRecommendation === index ? 'rotate-180' : ''
                          }`}
                      />
                    </div>
                  </button>
                  <div
                    id={`recommendation-explanation-${index}`}
                    data-explanation-container
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      expandedRecommendation === index ? 'max-h-48' : 'max-h-0'
                    }`}
                  >
                    <p className="px-4 pb-4 pl-12 text-sm text-slate-600 dark:text-slate-400">{rec.explanation}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-6 text-sm text-slate-500 dark:text-slate-400 text-center">
            <p>Bagikan hasil ini dengan tim Anda dan hubungi <strong>RICE AI Consultant</strong> untuk diskusi lebih lanjut tentang bagaimana kami dapat membantu akselerasi transformasi AI Anda.</p>
          </div>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
          <button
            onClick={handleExportPDF}
            disabled={isExporting}
            className="w-full sm:w-auto transform bg-[#5890AD] text-white font-bold py-3 px-6 rounded-lg hover:bg-[#4A7891] transition-all duration-300 flex items-center justify-center space-x-2 shadow-md hover:shadow-lg hover:-translate-y-px disabled:bg-[#9BBBCC] disabled:cursor-not-allowed disabled:transform-none"
          >
            {isExporting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 9.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 7.414V13a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Unduh Hasil (PDF)</span>
                </>
            )}
          </button>
          <button
            onClick={onRestart}
            className="w-full sm:w-auto transform bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200 font-bold py-3 px-6 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-px"
          >
            Ulangi Assessment
          </button>
        </div>
      </div>

      {exportMessage && (
        <div 
            className={`fixed bottom-5 right-5 z-50 flex items-center w-full max-w-xs p-4 space-x-4 bg-white dark:bg-[#1A2E35] rounded-lg shadow-lg transition-all duration-300 animate-fade-in-scale ${
                exportMessage.type === 'success' ? 'text-[#4A6B7B] dark:text-[#9BBBCC]' : 'text-red-700 dark:text-red-400'
            }`}
            role="alert"
        >
            {exportMessage.type === 'success' ? (
                 <svg className="w-6 h-6 text-[#5890AD]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            ) : (
                <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            )}
            <div className="pl-4 text-sm font-normal text-slate-600 dark:text-slate-300">{exportMessage.message}</div>
        </div>
      )}

      <CategoryDetailModal
        isOpen={modalData.isOpen}
        onClose={handleCloseModal}
        category={modalData.category || ''}
        score={modalData.score || 0}
        maxScore={modalData.maxScore || 0}
        title={modalData.title || ''}
        explanation={modalData.explanation || ''}
      />
    </>
  );
};

export default ResultsPage;