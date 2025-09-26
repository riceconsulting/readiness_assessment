
import React from 'react';

interface CategoryScoreData {
  score: number;
  maxScore: number;
}

interface CategoryScoresChartProps {
  scores: Record<string, CategoryScoreData>;
  onWhyClick: (category: string) => void;
}

const CategoryScoresChart: React.FC<CategoryScoresChartProps> = ({ scores, onWhyClick }) => {
  const categoryOrder = [
    'Strategi & Visi',
    'Kesiapan Data',
    'SDM & Budaya',
    'Teknologi & Infrastruktur',
    'Proses Bisnis',
    'Tata Kelola & Etika',
    'Investasi & ROI',
  ];

  return (
    <div className="my-10 text-left">
      <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-4 text-center">Skor Berdasarkan Kategori</h3>
      <div className="space-y-2 rounded-lg bg-slate-100/50 dark:bg-[#17252A]/50 p-4 sm:p-6">
        {categoryOrder.map((category) => {
          const data = scores[category];
          if (!data) return null;
          const percentage = data.maxScore > 0 ? (data.score / data.maxScore) * 100 : 0;

          let barColor = 'bg-[#5890AD]';
          if (percentage <= 50) barColor = 'bg-amber-500';
          if (percentage <= 25) barColor = 'bg-red-500';

          return (
            <button
              key={category}
              onClick={() => onWhyClick(category)}
              className="w-full text-left p-3 rounded-lg transition-all duration-200 hover:bg-slate-200/50 dark:hover:bg-slate-700/50 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-[#5890AD] focus:bg-slate-200/50 dark:focus:bg-slate-700/50"
              aria-label={`Lihat detail untuk kategori ${category}`}
            >
              <div className="flex justify-between items-center mb-1">
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{category}</p>
                <p className="text-sm font-bold text-slate-600 dark:text-slate-400">{data.score}/{data.maxScore}</p>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-4 overflow-hidden">
                <div
                  className={`${barColor} h-4 rounded-full transition-all duration-1000 ease-out`}
                  style={{ width: `${percentage}%` }}
                  role="progressbar"
                  aria-valuenow={data.score}
                  aria-valuemin={0}
                  aria-valuemax={data.maxScore}
                  aria-label={`${category} score`}
                ></div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryScoresChart;