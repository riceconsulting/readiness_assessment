
import React, { useState, useEffect, useRef } from 'react';

declare var html2canvas: any;

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  resultRef: React.RefObject<HTMLDivElement>;
}

// Icon components
const DownloadIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
);

const ClipboardIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>
);

const CheckIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

const XIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H4.54l4.741 6.349L18.244 2.25zM14.04 18.89l1.142 1.632H20.5l-6.332-9.006-1.142-1.632H4.25l6.332 9.006z" />
    </svg>
);

const LinkedinIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
        <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.25 6.5 1.75 1.75 0 016.5 8.25zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93-.78 0-1.12.5-1.12 1.93V19h-3v-9h3v1.38h.04a2.79 2.79 0 012.58-1.38C18.01 10 19 11.53 19 14.26V19z" />
    </svg>
);

const FacebookIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
    </svg>
);

const WhatsAppIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zM12.04 20.12c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31c-.82-1.31-1.26-2.83-1.26-4.38 0-4.54 3.69-8.23 8.23-8.23 4.54 0 8.23 3.69 8.23 8.23s-3.69 8.23-8.23 8.23zm4.52-6.14c-.25-.12-1.47-.72-1.7-.82-.23-.09-.39-.12-.56.12-.17.25-.64.82-.79.98-.15.17-.29.19-.54.06-.25-.12-1.06-.39-2.02-1.25-.75-.67-1.25-1.5-1.4-1.75-.15-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.15.17-.25.25-.41.09-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.42h-.48c-.17 0-.43.06-.66.31-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.02 2.56.12.17 1.76 2.68 4.27 3.77 2.51 1.08 2.51.72 2.96.69.45-.03 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.07-.12-.23-.19-.48-.31z"/>
    </svg>
);


const LoadingSpinner: React.FC = () => (
  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

const DEFAULT_SHARE_TEXT = "I just assessed my company's AI readiness with RICE AI Consultant! It provides a great breakdown of strengths and areas for improvement. Find out where your business stands:";

const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, resultRef }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [shareMessage, setShareMessage] = useState(DEFAULT_SHARE_TEXT);
  const modalRef = useRef<HTMLDivElement>(null);
  
  const canCopy = !!(navigator.clipboard && navigator.clipboard.write && window.ClipboardItem);

  // Reset states on close
  useEffect(() => {
    if (!isOpen) {
        setTimeout(() => {
            setIsProcessing(false);
            setCopied(false);
            setDownloaded(false);
            setError(null);
            setShareMessage(DEFAULT_SHARE_TEXT);
        }, 300); // Wait for fade out
    }
  }, [isOpen]);

  const generateCanvas = async () => {
    if (!resultRef.current) {
      throw new Error("Result element not found for capture.");
    }
    
    const canvas = await html2canvas(resultRef.current, {
      scale: 2,
      backgroundColor: '#ffffff', // Explicitly set background
      onclone: (clonedDoc: Document) => {
        // Force light theme for image rendering
        clonedDoc.documentElement.classList.remove('dark');
        clonedDoc.body.style.backgroundColor = '#ffffff';

        const resultElement = clonedDoc.querySelector<HTMLElement>('[class*="dark:bg-[#1A2E35]"]');
        if (resultElement) {
            resultElement.style.backgroundColor = '#ffffff';
        }

        // IDs of elements to hide for a cleaner, more focused share image
        const elementsToHide = [
          'recommendations-section',
          'results-footer',
          'share-hide-title',
          'share-hide-subtitle',
          'share-hide-description'
        ];

        elementsToHide.forEach(id => {
          const element = clonedDoc.getElementById(id);
          if (element) {
            element.style.display = 'none';
          }
        });
      }
    });
    
    return canvas;
  };

  const handleDownload = async () => {
    setIsProcessing(true);
    setCopied(false);
    setDownloaded(false);
    setError(null);

    try {
      const canvas = await generateCanvas();
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = 'RICE-AI-Assessment-Result.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setDownloaded(true);
      setTimeout(() => setDownloaded(false), 2500);
    } catch (err) {
      console.error("Image Download Error:", err);
      setError("Gagal membuat gambar. Silakan coba lagi.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCopy = async () => {
    if (!canCopy || isProcessing) return;

    setIsProcessing(true);
    setCopied(false);
    setDownloaded(false);
    setError(null);

    try {
      const canvas = await generateCanvas();
      const blob: Blob | null = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));

      if (!blob) throw new Error("Canvas to Blob conversion failed");
      
      await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
      
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);

    } catch (err) {
      console.error("Image Copy Error:", err);
      let message = "Gagal menyalin gambar. Coba unduh sebagai alternatif.";
      if (err instanceof DOMException && (err.name === 'NotAllowedError' || err.name === 'SecurityError')) {
          message = "Penyalinan diblokir oleh browser. Silakan unduh gambar sebagai gantinya.";
      }
      setError(message);
    } finally {
      setIsProcessing(false);
    }
  };

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
        if (event.key === 'Escape') onClose();
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
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose]);

  const assessmentUrl = typeof window !== 'undefined' ? window.location.origin + window.location.pathname : '';
  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareMessage)}&url=${encodeURIComponent(assessmentUrl)}`;
  const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(assessmentUrl)}`;
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(assessmentUrl)}`;
  const whatsappShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareMessage + ' ' + assessmentUrl)}`;

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 dark:bg-black/70 z-50 flex justify-center items-center p-4 transition-opacity duration-300 animate-fade-in-scale"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="share-modal-title"
    >
      <div
        ref={modalRef}
        className="bg-white dark:bg-[#1A2E35] rounded-2xl shadow-xl w-full max-w-sm transform transition-all duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 sm:p-8">
          <div className="flex justify-between items-start">
            <h2 id="share-modal-title" className="text-xl font-bold text-slate-800 dark:text-slate-100">
              Bagikan Hasil Anda
            </h2>
            <button
              onClick={onClose}
              className="-mt-2 -mr-2 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              aria-label="Tutup modal"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={handleDownload}
              disabled={isProcessing}
              className={`w-full flex items-center justify-center space-x-2 px-4 py-2.5 rounded-lg font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-[#1A2E35]
                ${downloaded ? 'bg-green-600 text-white' : 'bg-[#5890AD] text-white hover:bg-[#4A7891]'}
                ${isProcessing ? 'bg-slate-400 cursor-not-allowed' : ''}
              `}
            >
              {isProcessing ? <LoadingSpinner /> : (downloaded ? <CheckIcon className="w-5 h-5" /> : <DownloadIcon className="w-5 h-5" />)}
              <span>{downloaded ? 'Berhasil Diunduh!' : 'Unduh Gambar'}</span>
            </button>
            <button
              onClick={handleCopy}
              disabled={isProcessing || !canCopy}
              className={`w-full flex items-center justify-center space-x-2 px-4 py-2.5 rounded-lg font-semibold transition-colors duration-200 border
                ${copied ? 'bg-green-600 text-white border-green-600' : 'bg-transparent border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'}
                ${isProcessing ? 'bg-slate-400 text-white border-slate-400 cursor-not-allowed' : ''}
                ${!canCopy ? 'opacity-50 cursor-not-allowed' : ''}
              `}
              title={!canCopy ? 'Fungsi salin tidak didukung di browser ini' : 'Salin Gambar'}
            >
              {isProcessing ? <LoadingSpinner /> : (copied ? <CheckIcon className="w-5 h-5" /> : <ClipboardIcon className="w-5 h-5" />)}
              <span>{copied ? 'Berhasil Disalin!' : 'Salin Gambar'}</span>
            </button>
          </div>

          {error && <p className="mt-3 text-sm text-red-500 text-center">{error}</p>}
          
          <div className="mt-6">
            <label htmlFor="share-message" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Ubah Pesan (Opsional)
            </label>
            <textarea
                id="share-message"
                rows={4}
                value={shareMessage}
                onChange={(e) => setShareMessage(e.target.value)}
                disabled={isProcessing}
                className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 text-sm text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-[#5890AD] dark:focus:ring-[#9BBBCC] focus:border-[#5890AD] dark:focus:border-[#9BBBCC] transition-colors duration-200 disabled:bg-slate-100 dark:disabled:bg-slate-800/50 disabled:cursor-not-allowed"
            />
          </div>

          <div className="mt-4 border-t border-slate-200 dark:border-slate-700 pt-4">
              <p className="text-xs text-center text-slate-500 dark:text-slate-400 mb-3">Atau bagikan tautan langsung:</p>
              <div className={`grid grid-cols-2 gap-3 ${isProcessing ? 'opacity-50 pointer-events-none' : ''}`}>
                  <a
                      href={twitterShareUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center space-x-2 w-full bg-black text-white rounded-lg px-3 py-2 text-sm font-medium hover:bg-gray-800 transition-colors"
                  >
                      <XIcon className="w-4 h-4" />
                      <span>Share on X</span>
                  </a>
                  <a
                      href={linkedinShareUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center space-x-2 w-full bg-[#0077B5] text-white rounded-lg px-3 py-2 text-sm font-medium hover:bg-[#005E92] transition-colors"
                  >
                      <LinkedinIcon className="w-4 h-4" />
                      <span>LinkedIn</span>
                  </a>
                   <a
                      href={facebookShareUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center space-x-2 w-full bg-[#1877F2] text-white rounded-lg px-3 py-2 text-sm font-medium hover:bg-[#166FE5] transition-colors"
                  >
                      <FacebookIcon className="w-4 h-4" />
                      <span>Facebook</span>
                  </a>
                   <a
                      href={whatsappShareUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center space-x-2 w-full bg-[#25D366] text-white rounded-lg px-3 py-2 text-sm font-medium hover:bg-[#1EBE59] transition-colors"
                  >
                      <WhatsAppIcon className="w-4 h-4" />
                      <span>WhatsApp</span>
                  </a>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;