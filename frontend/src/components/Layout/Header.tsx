import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUserId, doesSessionExist, signOut } from 'supertokens-auth-react/recipe/session';
import { Sun, Moon, User, LogOut, ChevronDown, Home } from 'lucide-react';

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
        <div className="bg-white text-indigo-700 dark:bg-indigo-200 h-10 w-10 rounded-lg flex items-center justify-center shadow-md transition-all duration-300 group-hover:rotate-6">
          <Home className="w-5 h-5" />
        </div>
        <span className="text-xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-100 dark:from-indigo-100 dark:to-white">
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
              <span className="text-sm font-medium">{userId}</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showUserMenu ? 'rotate-180' : ''}`} />
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-3 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden transition-all duration-300 border border-indigo-100 dark:border-gray-700">
                <div className="p-4 border-b border-gray-100 dark:border-gray-700">
                  <p className="text-gray-800 dark:text-gray-200 font-semibold">Hello, {userId}</p>
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