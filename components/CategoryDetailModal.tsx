import React, { useEffect, useRef, useState } from 'react';
import { GoogleGenAI } from "@google/genai";

interface CategoryDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: string;
  score: number;
  maxScore: number;
  title: string;
  explanation: string;
}

const SparklesIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" />
    </svg>
);


const CategoryDetailModal: React.FC<CategoryDetailModalProps> = ({
  isOpen,
  onClose,
  category,
  score,
  maxScore,
  title,
  explanation,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [aiExplanation, setAiExplanation] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
        const fetchAiExplanation = async () => {
            setIsLoading(true);
            setAiExplanation(null);
            setError(null);
            try {
                const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
                const prompt = `You are an expert AI business consultant. A user has completed an assessment about their company's AI readiness.
                For the category "${category}", they scored ${score} out of a maximum of ${maxScore}.
                This score places them in the "${title}" level.
                The standard explanation for this level is: "${explanation}".

                Based on this information, provide a brief, personalized, and encouraging explanation (2-3 sentences) in Bahasa Indonesia that elaborates on why they likely received this score. Address the user directly ("Skor Anda menunjukkan bahwa..."). Do not simply repeat the standard explanation, but provide a slightly deeper, more consultative insight.`;
                
                const response = await ai.models.generateContent({
                    model: 'gemini-2.5-flash',
                    contents: prompt,
                });

                setAiExplanation(response.text);

            } catch (e) {
                console.error("Error generating AI explanation:", e);
                setError('Gagal menghasilkan analisis AI. Silakan coba lagi.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchAiExplanation();
    }
  }, [isOpen, category, score, maxScore, title, explanation]);


  useEffect(() => {
    if (isOpen) {
      const modalNode = modalRef.current;
      if (!modalNode) return;

      const focusableElements = modalNode.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      setTimeout(() => firstElement?.focus(), 100);

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          onClose();
        }

        if (event.key === 'Tab') {
          if (event.shiftKey) { 
            if (document.activeElement === firstElement) {
              lastElement.focus();
              event.preventDefault();
            }
          } else { 
            if (document.activeElement === lastElement) {
              firstElement.focus();
              event.preventDefault();
            }
          }
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const percentage = maxScore > 0 ? (score / maxScore) * 100 : 0;
  let barColor = 'bg-green-500';
  if (percentage < 50) barColor = 'bg-red-500';
  else if (percentage < 75) barColor = 'bg-yellow-500';

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4 transition-opacity duration-300"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 sm:p-8 transform animate-fade-in-scale"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-semibold text-green-600">{category}</p>
            <h2 id="modal-title" className="text-2xl font-bold text-gray-800 mt-1">{title}</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Tutup modal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="mt-4">
            <div id="modal-progress-label" className="flex justify-between items-center mb-1">
                <p className="text-sm font-medium text-gray-700">Skor Anda</p>
                <p className="text-sm font-bold text-gray-600">{score}/{maxScore}</p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5" 
                role="progressbar"
                aria-labelledby="modal-progress-label"
                aria-valuenow={score}
                aria-valuemin={0}
                aria-valuemax={maxScore}>
                <div
                className={`${barColor} h-2.5 rounded-full`}
                style={{ width: `${percentage}%` }}
                aria-hidden="true"
                ></div>
            </div>
        </div>

        <div className="mt-4 border-t pt-4">
          <p className="text-gray-600">{explanation}</p>
        </div>
        
        <div className="mt-4 bg-slate-50 p-4 rounded-lg border border-slate-200">
            <h4 className="text-sm font-semibold text-gray-800 flex items-center mb-2">
                <SparklesIcon className="w-5 h-5 mr-2 text-green-500" />
                Analisis AI
            </h4>
            {isLoading && (
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <div className="w-4 h-4 border-2 border-dashed rounded-full animate-spin border-gray-400"></div>
                    <span>Menganalisis hasil...</span>
                </div>
            )}
            {error && <p className="text-sm text-red-500">{error}</p>}
            {!isLoading && !error && aiExplanation && (
                <p className="text-sm text-gray-700">{aiExplanation}</p>
            )}
        </div>
        
        <div className="mt-6 text-right">
          <button
            onClick={onClose}
            className="bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryDetailModal;
