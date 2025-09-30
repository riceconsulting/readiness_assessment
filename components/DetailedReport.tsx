import React, { useState, useMemo } from 'react';
import type { Answer, Question, SortOption } from '../types';

interface DetailedReportProps {
  answers: Answer[];
  questions: Question[];
}

const DetailedReport: React.FC<DetailedReportProps> = ({ answers, questions }) => {
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
        <div className="max-w-3xl mx-auto">
            <div className="flex justify-between items-center mb-4 sm:mb-6">
                 <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">Laporan Rinci Jawaban Anda</h3>
                <div className="flex items-center">
                    <label htmlFor="sort-questions" className="text-sm text-slate-600 dark:text-slate-400 self-center mr-2 hidden sm:block">Urutkan:</label>
                    <select
                        id="sort-questions"
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value as SortOption)}
                        className="text-sm rounded-md border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 focus:ring-[#5890AD] focus:border-[#5890AD] transition"
                    >
                        <option value="default">Bawaan</option>
                        <option value="alphabetical-category">Kategori (A-Z)</option>
                        <option value="alphabetical-text">Pertanyaan (A-Z)</option>
                    </select>
                </div>
            </div>
            <ul className="space-y-4">
                {sortedQuestions.map((q) => (
                    <li key={q.id} className="p-4 bg-white dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700/50">
                        <p className="text-xs font-semibold text-[#5890AD] dark:text-[#9BBBCC]">{q.category}</p>
                        <p className="font-medium text-slate-700 dark:text-slate-300 mt-1">{q.text}</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                            <strong>Jawaban Anda:</strong> {q.selectedOptionText} (Skor: {q.answerScore}/4)
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default DetailedReport;