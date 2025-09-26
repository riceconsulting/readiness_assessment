
import React, { useEffect, useRef } from 'react';

interface CategoryDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: string;
  score: number;
  maxScore: number;
  title: string;
  explanation: string;
}

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