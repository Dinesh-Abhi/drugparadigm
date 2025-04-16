import Header from './Header';
import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Layout() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check if user has dark mode preference in localStorage
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDarkMode);

    // Listen for changes in dark mode preference
    const handleDarkModeChange = (e: any) => {
      setDarkMode(e.matches);
      localStorage.setItem('darkMode', e.matches);
    };

    // Check if browser supports prefers-color-scheme
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Set initial state based on system preference if no localStorage value
    if (localStorage.getItem('darkMode') === null) {
      setDarkMode(mediaQuery.matches);
      localStorage.setItem('darkMode', String(mediaQuery.matches));
    }
    
    // Add event listener for changes in system preference
    mediaQuery.addEventListener('change', handleDarkModeChange);
    
    // Apply dark mode class to html element
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Cleanup event listener on unmount
    return () => mediaQuery.removeEventListener('change', handleDarkModeChange);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem('darkMode', String(!darkMode));
  };

  return (
    <div className="bg-gradient-to-b from-slate-50 to-indigo-50 dark:from-gray-950 dark:to-indigo-950 min-h-screen">
      <Header toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}