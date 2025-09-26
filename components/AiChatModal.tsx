import React, { useState, useEffect, useRef } from 'react';
import type { Chat } from "@google/genai";
import type { ChatMessage } from '../types';

interface AiChatModalProps {
    isOpen: boolean;
    onClose: () => void;
    chatSession: Chat | null;
    messages: ChatMessage[];
    setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
}

const SparklesIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" />
    </svg>
);

const SendIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className} aria-hidden="true">
        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
    </svg>
);

const AiChatModal: React.FC<AiChatModalProps> = ({
    isOpen,
    onClose,
    chatSession,
    messages,
    setMessages,
}) => {
    const [userInput, setUserInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    useEffect(scrollToBottom, [messages]);
    
     useEffect(() => {
        if (isOpen) {
            // Focus input when modal opens
            setTimeout(() => inputRef.current?.focus(), 100);

            const handleKeyDown = (event: KeyboardEvent) => {
                if (event.key === 'Escape') onClose();
            };
            document.addEventListener('keydown', handleKeyDown);
            return () => document.removeEventListener('keydown', handleKeyDown);
        }
    }, [isOpen, onClose]);

    const handleSendMessage = async (messageText: string) => {
        if (!messageText.trim() || isLoading || !chatSession) return;

        const newUserMessage: ChatMessage = { sender: 'user', text: messageText };
        setMessages(prev => [...prev, newUserMessage]);
        setUserInput('');
        setIsLoading(true);

        // Add a placeholder for the AI response
        setMessages(prev => [...prev, { sender: 'ai', text: '' }]);

        try {
            const stream = await chatSession.sendMessageStream({ message: messageText });
            
            let accumulatedText = '';
            for await (const chunk of stream) {
                const chunkText = chunk.text;
                if (chunkText) {
                    accumulatedText += chunkText;
                     setMessages(prev => {
                        const newMessages = [...prev];
                        const lastMessage = newMessages[newMessages.length - 1];
                        if (lastMessage && lastMessage.sender === 'ai') {
                            lastMessage.text = accumulatedText;
                        }
                        return newMessages;
                    });
                }
            }
        } catch (error) {
            console.error("AI Chat Error:", error);
            const errorMessage: ChatMessage = { sender: 'ai', text: 'Maaf, terjadi kesalahan saat menghubungi AI. Silakan coba lagi nanti.' };
            setMessages(prev => {
                const newMessages = [...prev.slice(0, -1)]; // remove placeholder
                return [...newMessages, errorMessage];
            });
        } finally {
            setIsLoading(false);
             setTimeout(() => inputRef.current?.focus(), 100);
        }
    };
    
    const suggestedPrompts = [
        "Industri kami adalah manufaktur, tantangan utama kami adalah kontrol kualitas.",
        "Bagaimana AI bisa membantu kami mengurangi biaya operasional?",
        "Berdasarkan skor 'Rendah' di Kesiapan Data, apa langkah pertama yang paling penting?",
    ];

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black/60 dark:bg-black/70 z-50 flex justify-center items-center p-4 transition-opacity duration-300 animate-fade-in-scale"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="ai-chat-modal-title"
        >
            <div
                ref={modalRef}
                className="bg-white dark:bg-[#1A2E35] rounded-2xl shadow-xl w-full max-w-2xl h-[90vh] max-h-[700px] flex flex-col transform transition-all duration-300"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex justify-between items-center p-4 border-b border-slate-200 dark:border-slate-700 flex-shrink-0">
                    <div className="flex items-center space-x-2">
                        <SparklesIcon className="w-6 h-6 text-[#5890AD]" />
                        <h2 id="ai-chat-modal-title" className="text-lg font-bold text-slate-800 dark:text-slate-100">
                            Tanya AI Konsultan
                        </h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                        aria-label="Tutup chat"
                    >
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>
                
                {/* Messages Area */}
                <div className="flex-grow p-4 overflow-y-auto bg-slate-50 dark:bg-[#17252A]">
                    <div className="space-y-4">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                {msg.sender === 'ai' && <div className="w-8 h-8 rounded-full bg-[#5890AD] flex items-center justify-center flex-shrink-0"><SparklesIcon className="w-5 h-5 text-white"/></div>}
                                <div className={`max-w-md p-3 rounded-2xl animate-fade-in-scale ${msg.sender === 'user' ? 'bg-[#5890AD] text-white rounded-br-none' : 'bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-bl-none'}`}>
                                    {msg.text ? (
                                        <p className="text-sm max-w-none" dangerouslySetInnerHTML={{ __html: msg.text.replace(/\n/g, '<br />') }}></p>
                                    ) : (
                                        <div className="flex items-center space-x-1">
                                            <span className="w-2 h-2 bg-slate-400 rounded-full animate-pulse"></span>
                                            <span className="w-2 h-2 bg-slate-400 rounded-full animate-pulse [animation-delay:0.2s]"></span>
                                            <span className="w-2 h-2 bg-slate-400 rounded-full animate-pulse [animation-delay:0.4s]"></span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                        {isLoading && messages[messages.length-1]?.sender !== 'ai' && (
                             <div className="flex items-end gap-2 justify-start">
                                <div className="w-8 h-8 rounded-full bg-[#5890AD] flex items-center justify-center flex-shrink-0"><SparklesIcon className="w-5 h-5 text-white"/></div>
                                <div className="max-w-md p-3 rounded-2xl bg-slate-200 dark:bg-slate-700">
                                    <div className="flex items-center space-x-1">
                                        <span className="w-2 h-2 bg-slate-400 rounded-full animate-pulse"></span>
                                        <span className="w-2 h-2 bg-slate-400 rounded-full animate-pulse [animation-delay:0.2s]"></span>
                                        <span className="w-2 h-2 bg-slate-400 rounded-full animate-pulse [animation-delay:0.4s]"></span>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                </div>

                 {/* Suggested Prompts */}
                {messages.length <= 1 && (
                    <div className="p-2 sm:p-4 border-t border-slate-200 dark:border-slate-700 flex-shrink-0 bg-white dark:bg-[#1A2E35]">
                         <p className="text-xs text-slate-500 dark:text-slate-400 mb-2 text-center">Atau coba salah satu pertanyaan ini:</p>
                        <div className="flex flex-col sm:flex-row gap-2">
                            {suggestedPrompts.map((prompt, i) => (
                                <button key={i} onClick={() => handleSendMessage(prompt)} disabled={isLoading} className="flex-1 text-xs text-center p-2 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors disabled:opacity-50">
                                    {prompt}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
                
                {/* Input Form */}
                <div className="p-4 border-t border-slate-200 dark:border-slate-700 flex-shrink-0 bg-white dark:bg-[#1A2E35]">
                    <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(userInput); }} className="flex items-center space-x-2">
                        <input
                            ref={inputRef}
                            type="text"
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            placeholder="Ketik pertanyaan Anda di sini..."
                            disabled={isLoading}
                            className="flex-grow w-full p-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-sm text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-[#5890AD] dark:focus:ring-[#9BBBCC] transition-colors disabled:bg-slate-100 dark:disabled:bg-slate-800/50"
                        />
                        <button type="submit" disabled={isLoading || !userInput.trim()} className="p-3 rounded-lg bg-[#5890AD] text-white hover:bg-[#4A7891] transition-colors disabled:bg-slate-400 dark:disabled:bg-slate-600 disabled:cursor-not-allowed">
                            <SendIcon className="w-5 h-5" />
                        </button>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default AiChatModal;