
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
      <h3 className="text-xl font-bold text-text-primary-light dark:text-text-primary-dark dark:text-text-primary-dark mb-4 text-center">Skor Berdasarkan Kategori</h3>
      <div className="space-y-2 rounded-lg bg-surface-light dark:bg-surface-dark/50 dark:bg-surface-dark/50 p-4 sm:p-6">
        {categoryOrder.map((category) => {
          const data = scores[category];
          if (!data) return null;
          const percentage = data.maxScore > 0 ? (data.score / data.maxScore) * 100 : 0;

          let barColor = 'bg-accent-light';
          if (percentage <= 50) barColor = 'bg-amber-500';
          if (percentage <= 25) barColor = 'bg-error-light dark:bg-error-dark';

          return (
            <button
              key={category}
              onClick={() => onWhyClick(category)}
              className="w-full text-left p-3 rounded-lg transition-all duration-200 hover:bg-surface-light dark:bg-surface-dark/50 dark:hover:bg-surface-light dark:bg-surface-dark/50 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-accent-light focus:bg-surface-light dark:bg-surface-dark/50 dark:focus:bg-surface-light dark:bg-surface-dark/50"
              aria-label={`Lihat detail untuk kategori ${category}`}
            >
              <div className="flex justify-between items-center mb-1">
                <p className="text-sm font-medium text-text-primary-light dark:text-text-primary-dark dark:text-text-primary-dark">{category}</p>
                <p className="text-sm font-bold text-text-primary-light dark:text-text-primary-dark dark:text-text-primary-dark">{data.score}/{data.maxScore}</p>
              </div>
              <div className="w-full bg-surface-light dark:bg-surface-dark dark:bg-surface-dark rounded-full h-4 overflow-hidden">
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