import Header from './Header';
import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Footer from './Footer';

const STORAGE_KEY = 'darkMode';

const setCookie = (name: string, value: string, days = 365) => {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/`;
};

const getCookie = (name: string) => {
  return document.cookie
    .split('; ')
    .find(row => row.startsWith(name + '='))
    ?.split('=')[1];
};

export default function Layout() {
  const [darkMode, setDarkMode] = useState(false);

  // Read cookie on mount
  useEffect(() => {
    const savedPreference = getCookie(STORAGE_KEY);

    if (savedPreference !== undefined) {
      setDarkMode(savedPreference === 'true');
    } else {
      setDarkMode(false); // default to light
      setCookie(STORAGE_KEY, 'false');
    }
  }, []);

  // Apply/remove dark mode class on state change
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Toggle handler
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    setCookie(STORAGE_KEY, String(newDarkMode));
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-slate-50 to-indigo-50 dark:from-gray-950 dark:to-indigo-950 transition-colors duration-300">
      <Header toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
      <main className="flex-grow container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <Outlet />
      </main>
      <Footer darkMode={darkMode} />
    </div>
  );
}
