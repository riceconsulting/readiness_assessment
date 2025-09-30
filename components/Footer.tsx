import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="static sm:fixed bottom-0 left-0 w-full bg-surface-light/90 dark:bg-surface-dark/90 backdrop-blur-sm shadow-lg z-30 border-t border-border-light dark:border-border-dark">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 max-w-7xl">
        <div className="flex flex-col sm:flex-row justify-center items-center text-center sm:justify-between">
          <p className="text-sm text-primary-navy dark:text-slate-300 mb-2 sm:mb-0 sm:mr-4">
            <span className="hidden sm:inline">Siap mendiskusikan hasil Anda dan mempercepat perjalanan AI Anda?</span>
            <span className="sm:hidden font-medium">Diskusi Hasil Anda Lebih Lanjut?</span>
          </p>
          <a
            href="https://api.whatsapp.com/send/?phone=6285330168811&text=Hi%2C+I've+completed+the+RICE+AI+Readiness+Assessment+and+would+like+to+discuss+my+results.&type=phone_number&app_absent=0"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 px-4 py-2 bg-accent-teal text-white dark:bg-accent-sky dark:text-primary-navy font-semibold rounded-lg shadow-md hover:brightness-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-surface-light dark:focus:ring-offset-surface-dark focus:ring-accent-teal dark:focus:ring-accent-sky transition-all duration-200 transform hover:scale-105 active:scale-95"
          >
            Hubungi Konsultan
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;