
import React from 'react';
import { TOTAL_QUESTIONS } from '../constants';

interface HomePageProps {
  onStart: () => void;
}

const CheckIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
);


const HomePage: React.FC<HomePageProps> = ({ onStart }) => {
  const categoryCount = 7; // Manually set based on the new structure
  const estimatedTime = Math.ceil(TOTAL_QUESTIONS * 0.5); // 30 seconds per question

  return (
    <div className="text-center animate-fade-in-scale">
      <h2 className="text-3xl font-bold text-gray-800">Ukur Kesiapan AI & Otomasi Perusahaan Anda</h2>
      <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
        AI bukan lagi masa depan, tapi kebutuhan masa kini. Assessment ini dirancang untuk memberikan gambaran cepat dan akurat mengenai posisi perusahaan Anda dalam perjalanan transformasi digital.
      </p>

      <div className="mt-8 text-left max-w-lg mx-auto bg-green-50/50 p-6 rounded-lg border border-green-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">Apa yang Akan Anda Dapatkan?</h3>
        <ul className="space-y-3">
          <li className="flex items-start">
            <CheckIcon className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-1" />
            <span className="text-gray-700">
              <strong>Skor Kesiapan Total</strong> yang menunjukkan level maturitas AI Anda secara keseluruhan.
            </span>
          </li>
          <li className="flex items-start">
            <CheckIcon className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-1" />
            <span className="text-gray-700">
              <strong>Analisis Mendalam</strong> di {categoryCount} area kunci, mulai dari strategi hingga teknologi.
            </span>
          </li>
          <li className="flex items-start">
            <CheckIcon className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-1" />
            <span className="text-gray-700">
              <strong>Rekomendasi Praktis</strong> yang disesuaikan dengan level Anda untuk langkah selanjutnya.
            </span>
          </li>
        </ul>
      </div>

      <div className="mt-8">
        <button
          onClick={onStart}
          className="transform bg-green-600 text-white font-bold py-4 px-8 rounded-lg hover:bg-green-700 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1"
        >
          Mulai Assessment
        </button>
        <p className="text-sm text-gray-500 mt-3">
          Terdiri dari {TOTAL_QUESTIONS} pertanyaan, estimasi {estimatedTime} menit.
        </p>
      </div>
    </div>
  );
};

export default HomePage;