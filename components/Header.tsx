
import React from 'react';

const RiceGrainIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    aria-hidden="true"
  >
    <path d="M11.63,2.42C10.27,2.8 9.35,3.92 9.21,5.34L9.06,7.03C8.93,8.28 9.5,9.47 10.47,10.2L12,11.35L13.53,10.2C14.5,9.47 15.07,8.28 14.94,7.03L14.79,5.34C14.65,3.92 13.73,2.8 12.37,2.42C12.25,2.39 12.12,2.37 12,2.37C11.88,2.37 11.75,2.39 11.63,2.42M20.29,9.71L20.29,9.71L15.3,13.25C14.5,13.82 14.07,14.72 14.07,15.67V20.59C14.07,21.04 13.84,21.46 13.47,21.71C13.1,21.96 12.62,22 12.19,21.82L12,21.77L11.81,21.82C11.38,22 10.9,21.96 10.53,21.71C10.16,21.46 9.93,21.04 9.93,20.59V15.67C9.93,14.72 9.5,13.82 8.7,13.25L3.71,9.71L3.71,9.71C3,9.24 2.76,8.36 3.1,7.58L3.1,7.58L3.7,6.5C4.07,5.67 4.9,5.13 5.83,5.13H18.17C19.1,5.13 19.93,5.67 20.3,6.5L20.9,7.58C21.24,8.36 21,9.24 20.29,9.71Z" />
  </svg>
);


const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 max-w-4xl">
        <div className="flex items-center space-x-3">
          <RiceGrainIcon className="w-8 h-8 text-green-600" />
          <div>
            <h1 className="text-xl font-bold text-gray-800 tracking-wide">RICE AI Consultant</h1>
            <p className="text-sm text-gray-500">AI & Data Automation Readiness Assessment</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
