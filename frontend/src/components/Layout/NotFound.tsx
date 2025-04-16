import { Home, ArrowLeft, RefreshCw } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10);

  // Countdown timer effect
  useEffect(() => {
    if (countdown <= 0) return;
    
    const timer = setTimeout(() => {
      setCountdown(countdown - 1);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [countdown]);

  // Redirect after countdown
  useEffect(() => {
    if (countdown === 0) {
      navigate('/');
    }
  }, [countdown, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-indigo-50 dark:from-gray-900 dark:to-indigo-950 flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-red-500 rounded-full opacity-5 blur-3xl"></div>
        <div className="absolute top-1/3 right-1/3 w-96 h-96 bg-indigo-500 rounded-full opacity-5 blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500 rounded-full opacity-5 blur-3xl"></div>
      </div>

      {/* Grid background */}
      <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02]" style={{ backgroundSize: '32px 32px' }}></div>

      {/* Content container */}
      <div className="relative max-w-md w-full bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 p-8 flex flex-col items-center">
        {/* 404 text with animation */}
        <div className="relative">
          <h1 className="text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-purple-600 dark:from-red-400 dark:to-purple-500 animate-pulse">
            404
          </h1>
          <div className="absolute -top-6 -right-6 w-12 h-12 bg-yellow-300 dark:bg-yellow-500 rounded-full flex items-center justify-center rotate-12 animate-bounce-slow">
            <span className="text-sm font-bold text-yellow-800">!</span>
          </div>
        </div>

        <h2 className="mt-6 mb-2 text-2xl font-bold text-gray-800 dark:text-gray-100">
          Page Not Found
        </h2>
        
        <p className="text-gray-600 dark:text-gray-300 text-center mb-8">
          The page you are looking for doesn't exist or has been moved to another dimension.
        </p>
        
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <button 
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-full flex items-center gap-2 transition-all shadow-md hover:shadow-lg"
          >
            <Home size={18} />
            Go Home
          </button>
          
          <button 
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium rounded-full flex items-center gap-2 transition-all border border-gray-200 dark:border-gray-600 shadow-md hover:shadow-lg"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>
        </div>
        
        {/* Countdown */}
        <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
          <RefreshCw size={14} className="animate-spin-slow" />
          Redirecting to home in {countdown} seconds
        </div>
      </div>
      
      {/* Lost traveler */}
      <div className="mt-8 text-center max-w-xs text-gray-500 dark:text-gray-400 text-sm">
        <p>It seems you've wandered off the path. Not to worry, even the best explorers get lost sometimes.</p>
      </div>
    </div>
  );
}