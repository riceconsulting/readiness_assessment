
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
      <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Skor Berdasarkan Kategori</h3>
      <div className="space-y-2 rounded-lg bg-gray-50 p-4 sm:p-6">
        {categoryOrder.map((category) => {
          const data = scores[category];
          if (!data) return null;
          const percentage = data.maxScore > 0 ? (data.score / data.maxScore) * 100 : 0;

          let barColor = 'bg-green-500';
          if (percentage <= 50) barColor = 'bg-yellow-500';
          if (percentage <= 25) barColor = 'bg-red-500';

          return (
            <button
              key={category}
              onClick={() => onWhyClick(category)}
              className="w-full text-left p-3 rounded-lg transition-all duration-200 hover:bg-gray-100 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:bg-gray-100"
              aria-label={`Lihat detail untuk kategori ${category}`}
            >
              <div className="flex justify-between items-center mb-1">
                <p className="text-sm font-medium text-gray-700">{category}</p>
                <p className="text-sm font-bold text-gray-600">{data.score}/{data.maxScore}</p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
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
