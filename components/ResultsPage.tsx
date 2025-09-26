

import React, { useMemo, useRef, useState, useEffect } from 'react';
import type { Answer, Question, ChatMessage } from '../types';
import { resultLevels, assessmentQuestions, MAX_SCORE_PER_QUESTION, scoreExplanations, getScoreTier } from '../constants';
import RadarChart from './RadarChart';
import CategoryDetailModal from './CategoryDetailModal';
import DetailedReport from './DetailedReport';
import ExecutiveSummary from './ExecutiveSummary';
import AiChatModal from './AiChatModal';
import { GoogleGenAI } from '@google/genai';
import type { Chat } from '@google/genai';
import { createRoot } from 'react-dom/client';
import PdfReport from './PdfReport';

declare var html2canvas: any;
declare var jspdf: any;

interface ResultsPageProps {
  answers: Answer[];
  onRestart: () => void;
  questions: Question[];
  isSharedView?: boolean;
}

const ResultsPage: React.FC<ResultsPageProps> = ({ 
    answers, 
    onRestart, 
    questions, 
    isSharedView = false,
}) => {
  const totalScore = useMemo(() => answers.reduce((sum, answer) => sum + answer.score, 0), [answers]);
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
  
  // AI Features State
  const [summary, setSummary] = useState('');
  const [isSummaryGenerated, setIsSummaryGenerated] = useState(false);
  const [isSummaryLoading, setIsSummaryLoading] = useState(false);
  const [summaryError, setSummaryError] = useState<string | null>(null);
  const [isAiChatOpen, setIsAiChatOpen] = useState(false);
  const [chatSession, setChatSession] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);


  const totalMaxScore = questions.length * MAX_SCORE_PER_QUESTION;

  useEffect(() => {
    const timeoutId = setTimeout(() => setIsMounted(true), 100);
    return () => clearTimeout(timeoutId);
  }, []);

  // Fix: Explicitly type the useMemo hook to ensure categoryScores has a consistent type.
  const categoryScores = useMemo<Record<string, { score: number; maxScore: number; questionCount: number }>>(() => {
    if (!questions || questions.length === 0 || !answers) {
      return {};
    }
    const scores: Record<string, { score: number; maxScore: number; questionCount: number }> = {};
    
    questions.forEach(q => {
      if (!q || !q.category) return;
      
      if (!scores[q.category]) {
        scores[q.category] = { score: 0, maxScore: 0, questionCount: 0 };
      }
      
      const answer = answers.find(a => a && a.questionId === q.id);
      
      if (answer && typeof answer.score === 'number') {
        scores[q.category].score += answer.score;
      }
      scores[q.category].questionCount += 1;
      scores[q.category].maxScore += MAX_SCORE_PER_QUESTION;
    });
    
    return scores;
  }, [answers, questions]);

  const result = useMemo(() => {
    if (questions.length === 0) return resultLevels[0];

    const originalTotalMaxScore = assessmentQuestions.length * MAX_SCORE_PER_QUESTION;
    const scaledScore = (totalScore / totalMaxScore) * originalTotalMaxScore;
    
    return resultLevels.find(level => scaledScore >= level.minScore && scaledScore <= level.maxScore) || resultLevels[0];
  }, [totalScore, questions, totalMaxScore]);

  const createSummaryPrompt = () => {
    const categoryScoresText = Object.entries(categoryScores)
      .map(([category, data]: [string, { score: number; maxScore: number }]) => `- ${category}: ${data.score} dari ${data.maxScore}`)
      .join('\n');

    return `Anda adalah seorang konsultan bisnis AI yang ahli. Berdasarkan hasil assessment kesiapan AI sebuah perusahaan berikut, tuliskan sebuah ringkasan eksekutif (executive summary) dalam 3 paragraf singkat dalam Bahasa Indonesia. Ringkasan harus profesional, mudah dipahami oleh C-level, dan menyoroti kekuatan utama serta area prioritas untuk perbaikan.

**Data Hasil Assessment:**
*   **Level Kematangan:** ${result.title} (${result.level})
*   **Skor Total:** ${totalScore} dari ${totalMaxScore}
*   **Deskripsi Level:** ${result.description}

**Skor Per Kategori:**
${categoryScoresText}

Fokus pada implikasi bisnis dari skor-skor ini, bukan hanya mengulang angkanya. Berikan nada yang suportif dan konstruktif. Format output sebagai teks biasa, tanpa markdown.`;
  };

  const createChatSystemInstruction = () => {
      const categoryScoresText = Object.entries(categoryScores)
      .map(([category, data]: [string, { score: number; maxScore: number }]) => `  - ${category}: ${data.score} dari ${data.maxScore}`)
      .join('\n');
    return `Anda adalah seorang konsultan strategis senior dari RICE AI. Misi utama Anda adalah membantu pengguna memahami hasil assessment mereka secara mendalam dan memberikan wawasan yang tulus untuk pertumbuhan bisnis mereka. Anda BUKAN seorang penjual. Fokuslah untuk memberikan nilai, membangun kepercayaan, dan memposisikan diri sebagai mitra pemikir yang ahli.

Gunakan gaya bahasa yang profesional, empatik, dan suportif. Hindari jargon teknis yang berlebihan. Selalu berikan jawaban yang kontekstual dan relevan dengan data hasil assessment pengguna di bawah ini.

PENTING: Untuk memberikan saran yang paling relevan dan tidak generik, Anda harus proaktif. Setelah salam pembuka, selalu ajukan pertanyaan untuk memahami konteks bisnis pengguna. Tanyakan tentang industri mereka, tantangan utama yang dihadapi, atau tujuan spesifik yang ingin mereka capai dengan AI. Gunakan informasi ini untuk menyesuaikan semua jawaban Anda selanjutnya.

ATURAN FORMATTING: JANGAN gunakan format markdown (seperti **, *, -, #, dll.). Tulis semua jawaban dalam bentuk paragraf teks biasa yang mengalir alami, seolah-olah Anda sedang berbicara langsung dengan klien.

Berikut adalah data hasil assessment pengguna:
- Level Kematangan: ${result.title} (${result.level})
- Skor Total: ${totalScore} / ${totalMaxScore}
- Skor per Kategori:
${categoryScoresText}

Tujuan Anda adalah membantu mereka melihat gambaran besar, mengidentifikasi peluang, dan merasa diberdayakan untuk mengambil langkah selanjutnya yang paling berdampak bagi bisnis mereka.`;
  };

  const handleGenerateSummary = async () => {
    if (isSummaryLoading) return;

    setIsSummaryLoading(true);
    setSummaryError(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
      
      const summaryPrompt = createSummaryPrompt();
      const summaryResponse = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: summaryPrompt,
      });

      setSummary(summaryResponse.text);

    } catch (error) {
      console.error("AI Summary Generation Error:", error);
      setSummaryError("Gagal membuat ringkasan AI. Mohon periksa koneksi internet Anda dan coba lagi. Jika masalah berlanjut, hubungi dukungan.");
    } finally {
      setIsSummaryGenerated(true);
      setIsSummaryLoading(false);
    }
  };

  const handleOpenChat = async () => {
    // Initialize chat session on first open
    if (!chatSession) {
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
        const chat = ai.chats.create({
          model: 'gemini-2.5-flash',
          config: {
              systemInstruction: createChatSystemInstruction(),
          },
        });
        setChatSession(chat);

        const initialAiMessage: ChatMessage = {
          sender: 'ai',
          text: 'Halo! Saya adalah konsultan AI Anda. Saya telah menganalisis hasil assessment Anda. Agar saran saya lebih spesifik dan berguna, boleh ceritakan sedikit tentang bisnis Anda? Misalnya, di industri apa Anda bergerak dan apa tantangan terbesar yang sedang dihadapi?'
        };
        setMessages([initialAiMessage]);
      } catch (error) {
        console.error("AI Chat Initialization Error:", error);
        const errorMessage: ChatMessage = {
          sender: 'ai',
          text: 'Maaf, saya tidak dapat memulai sesi chat saat ini. Silakan coba lagi nanti.'
        };
        setMessages([errorMessage]);
      }
    }
    setIsAiChatOpen(true);
  };


  const handleToggleRecommendation = (index: number) => {
    setExpandedRecommendation(prev => (prev === index ? null : index));
  };

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

  const scorePercentage = totalMaxScore > 0 ? (totalScore / totalMaxScore) * 100 : 0;
  
  const handleExportPDF = () => {
    if (isExporting) return;
    
    setIsExporting(true);
    setExportMessage(null);
  
    const container = document.createElement('div');
    // Position off-screen
    container.style.position = 'absolute';
    container.style.left = '-9999px';
    container.style.top = '0';
    document.body.appendChild(container);

    const root = createRoot(container);
    root.render(
      <PdfReport
        result={result}
        totalScore={totalScore}
        totalMaxScore={totalMaxScore}
        categoryScores={categoryScores}
        summary={summary}
        messages={messages}
        answers={answers}
        questions={questions}
      />
    );

    // Use a timeout to allow the component to render fully before capturing
    setTimeout(() => {
        const elementToCapture = container.querySelector('#pdf-render-content');
        if (!elementToCapture) {
            console.error("PDF render target not found.");
            setExportMessage({ type: 'error', message: 'Gagal menyiapkan laporan untuk diunduh.' });
            root.unmount();
            document.body.removeChild(container);
            setIsExporting(false);
            return;
        }

        html2canvas(elementToCapture as HTMLElement, {
            scale: 2,
            useCORS: true,
            windowWidth: elementToCapture.scrollWidth,
            windowHeight: elementToCapture.scrollHeight,
        }).then((canvas: any) => {
            const { jsPDF } = jspdf;
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();
            
            const canvasWidth = canvas.width;
            const canvasHeight = canvas.height;
            const ratio = canvasHeight / canvasWidth;
            const imgHeight = pdfWidth * ratio;
            
            let heightLeft = imgHeight;
            let position = 0;
            let page = 1;

            const addPageNumbers = (pdfDoc: any, pageNum: number, totalPages: number) => {
                 pdfDoc.setFontSize(8);
                 pdfDoc.setTextColor(150);
                 pdfDoc.text(`Halaman ${pageNum} dari ${totalPages}`, pdfWidth / 2, pageHeight - 10, { align: 'center' });
            };
            
            const totalPages = Math.ceil(imgHeight / pageHeight);

            pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, pdfWidth, imgHeight);
            addPageNumbers(pdf, page, totalPages);
            heightLeft -= pageHeight;

            while (heightLeft > 0) {
                page++;
                position -= pageHeight;
                pdf.addPage();
                pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, pdfWidth, imgHeight);
                addPageNumbers(pdf, page, totalPages);
                heightLeft -= pageHeight;
            }

            pdf.save('RICE-AI-Readiness-Assessment-Report.pdf');
            setExportMessage({ type: 'success', message: 'PDF berhasil dibuat!' });
        }).catch((error: any) => {
          console.error("PDF Export Error:", error);
          setExportMessage({ type: 'error', message: 'Gagal membuat PDF. Silakan coba lagi.' });
        }).finally(() => {
            root.unmount();
            document.body.removeChild(container);
            setIsExporting(false);
            setTimeout(() => setExportMessage(null), 4000);
        });
    }, 500);
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
      <div className={`transition-opacity duration-300 ease-out ${isMounted ? 'opacity-100' : 'opacity-0'}`}>
        <div id="results-content-area" className="p-4 sm:p-8 bg-white dark:bg-[#1A2E35]">
          <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 text-center">Hasil Assessment Kesiapan AI Anda</h2>
          <p className="text-slate-600 dark:text-slate-400 mt-2 text-center">Selamat! Berikut adalah analisis terperinci mengenai posisi perusahaan Anda.</p>
          
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
            {/* Left Column */}
            <div
              className={`lg:col-span-3 space-y-8 transition-all duration-700 ease-out ${isMounted ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
              style={{ transitionDelay: '100ms' }}
            >
              {/* Overall Score */}
              <div className="text-center p-6 bg-slate-50 dark:bg-slate-800/50 rounded-lg shadow-inner" role="region" aria-label="Ringkasan Skor Akhir">
                <div className="relative w-48 h-48 mx-auto">
                  <svg className="w-full h-full" viewBox="0 0 36 36" transform="rotate(-90)" aria-hidden="true">
                    <defs>
                        <linearGradient id="gradient-mahir" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#9BBBCC" />
                            <stop offset="100%" stopColor="#5890AD" />
                        </linearGradient>
                        <linearGradient id="gradient-menengah" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#FBBF24" />
                            <stop offset="100%" stopColor="#F59E0B" />
                        </linearGradient>
                        <linearGradient id="gradient-pemula" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#F87171" />
                            <stop offset="100%" stopColor="#EF4444" />
                        </linearGradient>
                        <filter id="glow">
                            <feGaussianBlur stdDeviation="0.5" result="coloredBlur"/>
                            <feMerge>
                                <feMergeNode in="coloredBlur"/>
                                <feMergeNode in="SourceGraphic"/>
                            </feMerge>
                        </filter>
                    </defs>
                    <circle
                      className="text-slate-200 dark:text-slate-700"
                      cx="18"
                      cy="18"
                      r="15.9155"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <circle
                      cx="18"
                      cy="18"
                      r="15.9155"
                      fill="none"
                      stroke={`url(#gradient-${result.level.toLowerCase()})`}
                      strokeWidth="4"
                      strokeDasharray={`${isMounted ? scorePercentage : 0}, 100`}
                      strokeLinecap="round"
                      style={{ transition: 'stroke-dasharray 1s ease-out', transitionDelay: '200ms' }}
                      filter="url(#glow)"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className={`text-5xl font-extrabold text-slate-800 dark:text-slate-100 ${isMounted ? 'animate-pop-in' : 'opacity-0'}`} style={{ animationDelay: '200ms' }}>
                      {totalScore}
                    </span>
                    <span className="text-sm text-slate-500 dark:text-slate-400">/ {totalMaxScore}</span>
                  </div>
                </div>
                 <h3 className={`text-2xl font-bold mt-4 ${result.color}`}>{result.title}</h3>
                 <p className="mt-2 text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">{result.description}</p>
              </div>
              
              {!isSharedView && (
                <ExecutiveSummary 
                  summary={summary}
                  isGenerated={isSummaryGenerated}
                  isLoading={isSummaryLoading}
                  error={summaryError}
                  onGenerate={handleGenerateSummary}
                  onOpenChat={handleOpenChat}
                />
              )}

            </div>

            {/* Right Column */}
            <div
                className={`lg:col-span-2 lg:sticky lg:top-24 transition-all duration-700 ease-out ${isMounted ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}
                style={{ transitionDelay: '300ms' }}
            >
              <RadarChart scores={categoryScores} onWhyClick={handleWhyClick} isMounted={isMounted} />
            </div>
          </div>

          <div
            className={`transition-all duration-700 ease-out ${isMounted ? 'opacity-100' : 'opacity-0'}`}
          >
            <div id="recommendations-section" className="mt-12 text-left bg-transparent p-0">
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2 text-center">Rekomendasi Langkah Berikutnya</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 text-center">Klik setiap rekomendasi untuk melihat penjelasan detail.</p>
              <ul className="space-y-3 max-w-3xl mx-auto">
                {result.recommendations.map((rec, index) => (
                  <li 
                    key={index} 
                    className={`bg-white dark:bg-slate-700/50 rounded-md shadow-sm overflow-hidden transition-shadow duration-300 hover:shadow-md border border-slate-200 dark:border-slate-700 ${isMounted ? 'animate-fade-in-up' : 'opacity-0'}`}
                    style={{ animationDelay: `${600 + index * 120}ms` }}
                  >
                    <button
                      onClick={() => handleToggleRecommendation(index)}
                      className="w-full text-left p-4 hover:bg-slate-50 dark:hover:bg-slate-800 focus:bg-slate-50 dark:focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-[#9BBBCC] dark:focus:ring-[#5890AD] transition-colors duration-200"
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
                      className={`grid transition-all duration-300 ease-in-out ${
                        expandedRecommendation === index ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                      }`}
                    >
                      <div className="overflow-hidden">
                         <p className="px-4 pb-4 pl-12 text-sm text-slate-600 dark:text-slate-400">{rec.explanation}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            
            <DetailedReport answers={answers} questions={questions} />

            <div id="results-footer" className="mt-6 text-sm text-slate-500 dark:text-slate-400 text-center">
              <p>Unduh hasil ini untuk dibagikan dengan tim Anda dan hubungi <strong>RICE AI Consultant</strong> untuk diskusi lebih lanjut tentang bagaimana kami dapat membantu akselerasi transformasi AI Anda.</p>
            </div>
          </div>
        </div>

        <div
          className={`mt-10 flex flex-col sm:flex-row justify-center items-center gap-4 transition-all duration-700 ease-out ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{ transitionDelay: '700ms' }}
        >
          <button
            onClick={handleExportPDF}
            disabled={isExporting}
            className="group w-full sm:w-auto transform bg-gradient-to-br from-[#5890AD] to-[#4A6B7B] text-white font-bold py-3 px-6 rounded-lg hover:from-[#4A7891] hover:to-[#3b5663] transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl hover:-translate-y-px disabled:from-[#9BBBCC] disabled:to-[#8aa1b1] disabled:cursor-not-allowed disabled:transform-none"
          >
            {isExporting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Membuat PDF...</span>
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path d="M10.75 2.75a.75.75 0 00-1.5 0v8.614L6.295 8.235a.75.75 0 10-1.09 1.03l4.25 4.5a.75.75 0 001.09 0l4.25-4.5a.75.75 0 00-1.09-1.03l-2.955 3.129V2.75z" />
                    <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
                  </svg>
                  <span>Unduh Laporan (PDF)</span>
                </>
            )}
          </button>
           <button
            onClick={onRestart}
            className={`w-full sm:w-auto transform font-bold py-3 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-px ${
              isSharedView 
              ? 'bg-[#5890AD] text-white hover:bg-[#4A7891]'
              : 'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-700'
            }`}
          >
            {isSharedView ? 'Ikuti Assessment Ini' : 'Ulangi Assessment'}
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
                <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            )}
            <div className="text-sm font-medium">{exportMessage.message}</div>
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
      <AiChatModal
        isOpen={isAiChatOpen}
        onClose={() => setIsAiChatOpen(false)}
        chatSession={chatSession}
        messages={messages}
        setMessages={setMessages}
      />
    </>
  );
};

export default ResultsPage;