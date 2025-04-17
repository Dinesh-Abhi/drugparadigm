import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUserId, doesSessionExist, signOut } from 'supertokens-auth-react/recipe/session';
import { Sun, Moon, User, LogOut, ChevronDown } from 'lucide-react';

export default function Header() {
  const [isDark, setIsDark] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check session on mount
    async function checkSession() {
      const hasSession = await doesSessionExist();
      if (hasSession) {
        const id = await getUserId();
        setUserId(id);
      }
    }
    checkSession();

    // Check system preference for dark mode
    // if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    //   setIsDark(true);
    // }
  }, []);

  useEffect(() => {
    // Toggle dark mode class
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    // Save preference
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const handleLogout = async () => {
    await signOut();
    setShowUserMenu(false);
    navigate('/auth');
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setShowUserMenu(false);
    if (showUserMenu) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [showUserMenu]);

  return (
    <header className="bg-gradient-to-r from-indigo-800 to-indigo-600 text-white py-3 px-6 flex justify-between items-center shadow-lg fixed w-full z-50 top-0 dark:from-gray-900 dark:to-gray-800 transition-all duration-300 dark:border-0 border-b-2 border-solid border-gray-200">
      <Link to="/" className="flex items-center gap-2 group">
        <svg
          className="h-8 w-8 text-pink-600 dark:text-indigo-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
          />
        </svg>

        <span className="text-xl font-bold text-white dark:bg-gradient-to-r dark:from-indigo-400 dark:to-purple-400 dark:bg-clip-text dark:text-transparent">
          DrugParadigm
        </span>
      </Link>



      <div className="flex items-center gap-5">
        {/* Dark Mode Toggle */}
        <button
          onClick={() => setIsDark(!isDark)}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 hover:shadow-lg hover:scale-105"
          aria-label="Toggle dark mode"
        >
          {isDark ? (
            <Moon className="w-5 h-5 text-yellow-300" />
          ) : (
            <Sun className="w-5 h-5 text-yellow-300" />
          )}
        </button>

        {/* Auth Logic */}
        {userId ? (
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-all duration-300 hover:shadow-lg"
            >
              <div className="bg-indigo-200 text-indigo-800 rounded-full p-1">
                <User className="w-4 h-4" />
              </div>
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showUserMenu ? 'rotate-180' : ''}`} />
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-3 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden transition-all duration-300 border border-indigo-100 dark:border-gray-700">
                <div className="p-4 border-b border-gray-100 dark:border-gray-700">
                  <p className="text-gray-800 dark:text-gray-200 font-semibold">Hello</p>
                  <span className="text-gray-800 dark:text-gray-200 font-semibold">{userId}</span>
                </div>
                {/* <Link to="/profile" className="flex items-center gap-2 w-full text-left px-4 py-3 text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <User className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  My Profile
                </Link> */}
                {/* <Link to="/settings" className="flex items-center gap-2 w-full text-left px-4 py-3 text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <Settings className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  Settings
                </Link> */}
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 w-full text-left px-4 py-3 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            to="/auth"
            className="bg-white text-indigo-700 hover:bg-indigo-100 dark:bg-indigo-200 dark:hover:bg-indigo-100 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 hover:shadow-lg"
          >
            Login
          </Link>
        )}
      </div>
    </header>
  );
}