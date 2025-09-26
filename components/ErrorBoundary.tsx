import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  // Fix: Using constructor for state initialization to ensure `this.props` is correctly typed.
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can also log the error to an error reporting service
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-100 dark:bg-[#17252A] text-slate-800 dark:text-slate-200 p-4 text-center antialiased">
            <h1 className="text-3xl font-bold text-red-500">Oops! Terjadi Kesalahan.</h1>
            <p className="mt-4 max-w-lg">
                Maaf, aplikasi mengalami masalah yang tidak terduga. Tim kami telah diberitahu.
                Silakan coba muat ulang halaman ini untuk melanjutkan.
            </p>
            <button
                onClick={() => window.location.reload()}
                className="mt-6 px-6 py-2 bg-[#5890AD] text-white font-semibold rounded-lg hover:bg-[#4A7891] transition-colors"
            >
                Muat Ulang Halaman
            </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
