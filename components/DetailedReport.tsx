import React, { useState, useMemo } from 'react';
import type { Answer, Question, SortOption } from '../types';

interface DetailedReportProps {
  answers: Answer[];
  questions: Question[];
}

const ChevronDownIcon: React.FC<{ className?: string }> = ({ className }) => (
 <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
 </svg>
);


const DetailedReport: React.FC<DetailedReportProps> = ({ answers, questions }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [sortOption, setSortOption] = useState<SortOption>('default');

    const sortedQuestions = useMemo(() => {
        const questionsWithDetails = questions.map((question, index) => {
            const answer = answers.find(a => a.questionId === question.id);
            const selectedOption = question.options.find(o => o.score === (answer?.score ?? -1));
            return {
                ...question,
                answerScore: answer?.score ?? 0,
                selectedOptionText: selectedOption?.text || "Tidak terjawab",
                originalIndex: index,
            };
        });

        switch (sortOption) {
            case 'alphabetical-text':
                return [...questionsWithDetails].sort((a, b) => a.text.localeCompare(b.text));
            
            case 'alphabetical-category':
                return [...questionsWithDetails].sort((a, b) => {
                    const categoryCompare = a.category.localeCompare(b.category);
                    if (categoryCompare !== 0) return categoryCompare;
                    return a.originalIndex - b.originalIndex;
                });

            case 'default':
            default:
                return questionsWithDetails;
        }
    }, [questions, answers, sortOption]);

    return (
        <div className="mt-8">
            <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full flex justify-between items-center p-4 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-[#5890AD] transition-colors"
                    aria-expanded={isOpen}
                    aria-controls="detailed-report-content"
                >
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Laporan Rinci Jawaban Anda</h3>
                     <ChevronDownIcon
                        className={`w-6 h-6 text-slate-500 dark:text-slate-400 transform transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                        }`}
                    />
                </button>
                <div
                    id="detailed-report-content"
                    className={`grid transition-all duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                >
                    <div className="overflow-hidden">
                        <div className="p-4 border-t border-slate-200 dark:border-slate-700">
                            <div className="flex justify-end mb-4">
                                <label htmlFor="sort-questions" className="text-sm text-slate-600 dark:text-slate-400 self-center mr-2">Urutkan:</label>
                                <select
                                    id="sort-questions"
                                    value={sortOption}
                                    onChange={(e) => setSortOption(e.target.value as SortOption)}
                                    className="text-sm rounded-md border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 focus:ring-[#5890AD] focus:border-[#5890AD]"
                                >
                                    <option value="default">Bawaan</option>
                                    <option value="alphabetical-category">Kategori (A-Z)</option>
                                    <option value="alphabetical-text">Pertanyaan (A-Z)</option>
                                </select>
                            </div>
                            <ul className="space-y-4">
                                {sortedQuestions.map((q) => (
                                    <li key={q.id} className="p-3 bg-slate-100/50 dark:bg-slate-800/30 rounded-md">
                                        <p className="text-xs font-semibold text-[#5890AD] dark:text-[#9BBBCC]">{q.category}</p>
                                        <p className="font-medium text-slate-700 dark:text-slate-300 mt-1">{q.text}</p>
                                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                                            <strong>Jawaban Anda:</strong> {q.selectedOptionText} (Skor: {q.answerScore}/4)
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailedReport;