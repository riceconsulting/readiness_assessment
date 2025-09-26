
import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
  const percentage = (current / total) * 100;
  const roundedPercentage = Math.round(percentage);

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-2" id="progress-label">
        <p className="text-sm font-medium text-[#4A6B7B] dark:text-[#9BBBCC]">
          Pertanyaan {current} dari {total}
        </p>
        <p className="text-sm font-semibold text-[#4A6B7B] dark:text-[#9BBBCC]">{roundedPercentage}%</p>
      </div>
      <div
        className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5"
        role="progressbar"
        aria-labelledby="progress-label"
        aria-valuenow={current}
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuetext={`${roundedPercentage}% selesai`}
      >
        <div
          className="bg-[#5890AD] h-2.5 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
          aria-hidden="true"
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;