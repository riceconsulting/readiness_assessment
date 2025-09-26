import React, { useMemo, useRef, useState } from 'react';
import type { Answer } from '../types';
import { resultLevels, TOTAL_MAX_SCORE } from '../constants';
declare var html2canvas: any;
declare var jspdf: any;

interface ResultsPageProps {
  answers: Answer[];
  onRestart: () => void;
}

const ResultsPage: React.FC<ResultsPageProps> = ({ answers, onRestart }) => {
  const totalScore = useMemo(() => answers.reduce((sum, answer) => sum + answer.score, 0), [answers]);
  const resultRef = useRef<HTMLDivElement>(null);
  const [expandedRecommendation, setExpandedRecommendation] = useState<number | null>(null);

  const handleToggleRecommendation = (index: number) => {
    setExpandedRecommendation(prev => (prev === index ? null : index));
  };

  const result = useMemo(() => {
    return resultLevels.find(level => totalScore >= level.minScore && totalScore <= level.maxScore) || resultLevels[0];
  }, [totalScore]);

  const scorePercentage = (totalScore / TOTAL_MAX_SCORE) * 100;

  const handleExportPDF = () => {
    if (!resultRef.current) return;
    const { jsPDF } = jspdf;

    html2canvas(resultRef.current, { 
      scale: 2, 
      onclone: (document) => {
        // In the cloned document for canvas rendering, find all explanation containers and make them visible.
         const explanationElements = document.querySelectorAll('[data-explanation-container]');
         explanationElements.forEach(el => {
            const element = el as HTMLElement;
            element.classList.remove('max-h-0');
            element.classList.add('max-h-full');
         });
      }
    }).then((canvas: any) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('RICE-AI-Readiness-Assessment-Result.pdf');
    });
  };

  const CheckCircleIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
  );

  const ChevronDownIcon: React.FC<{ className?: string }> = ({ className }) => (
     <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
     </svg>
  );

  return (
    <div className="text-center">
      <div ref={resultRef} className="p-8 bg-white">
        <h2 className="text-3xl font-bold text-gray-800">Hasil Assessment Anda</h2>
        <p className="text-gray-600 mt-2">Berikut adalah ringkasan kesiapan AI dan Otomasi di perusahaan Anda.</p>

        <div className="my-8">
          <div className="relative w-40 h-40 mx-auto">
            <svg className="w-full h-full" viewBox="0 0 36 36">
              <path
                className="text-gray-200"
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
              />
              <path
                className={`${result.color.replace('text-', 'stroke-')}`}
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeDasharray={`${scorePercentage}, 100`}
                strokeLinecap="round"
                transform="rotate(90 18 18)"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-bold text-gray-800">{totalScore}</span>
              <span className="text-sm text-gray-500">/ {TOTAL_MAX_SCORE}</span>
            </div>
          </div>
        </div>

        <h3 className={`text-2xl font-bold ${result.color}`}>{result.title}</h3>
        <p className="mt-2 text-gray-600 max-w-2xl mx-auto">{result.description}</p>

        <div className="mt-8 text-left bg-green-50 p-6 rounded-lg">
          <h4 className="text-lg font-semibold text-gray-800 mb-2">Rekomendasi Langkah Berikutnya:</h4>
          <p className="text-sm text-gray-500 mb-4">Klik setiap rekomendasi untuk melihat penjelasan detail.</p>
          <ul className="space-y-2">
            {result.recommendations.map((rec, index) => (
              <li key={index} className="bg-white rounded-md shadow-sm overflow-hidden">
                <button
                  onClick={() => handleToggleRecommendation(index)}
                  className="w-full text-left p-4 focus:outline-none focus:ring-2 focus:ring-green-300"
                  aria-expanded={expandedRecommendation === index}
                  aria-controls={`recommendation-explanation-${index}`}
                >
                  <div className="flex items-center justify-between">
                     <div className="flex items-start">
                        <CheckCircleIcon className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                        <span className="flex-1 text-gray-800 font-medium">{rec.text}</span>
                     </div>
                     <ChevronDownIcon
                        className={`w-5 h-5 text-gray-400 ml-2 transform transition-transform duration-300 ${
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
                  <p className="px-4 pb-4 pl-12 text-sm text-gray-600">{rec.explanation}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-6 text-sm text-gray-500">
          <p>Bagikan hasil ini dengan tim Anda dan hubungi <strong>RICE AI Consultant</strong> untuk diskusi lebih lanjut tentang bagaimana kami dapat membantu akselerasi transformasi AI Anda.</p>
        </div>
      </div>

      <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
        <button
          onClick={handleExportPDF}
          className="w-full sm:w-auto bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-700 transition-colors duration-300 flex items-center justify-center space-x-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 9.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 7.414V13a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
          <span>Unduh Hasil (PDF)</span>
        </button>
        <button
          onClick={onRestart}
          className="w-full sm:w-auto bg-gray-200 text-gray-700 font-bold py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors duration-300"
        >
          Ulangi Assessment
        </button>
      </div>
    </div>
  );
};

export default ResultsPage;
