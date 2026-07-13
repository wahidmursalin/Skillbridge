import { Link, useNavigate } from 'react-router-dom'
import { FiMoon, FiSun, FiLogOut, FiUser } from 'react-icons/fi'
import { useTheme } from '../context/ThemeContext.jsx'
import { useAuth } from '../context/AuthContext.jsx'

export default function Navbar() {
  const { dark, toggleTheme } = useTheme()
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white/90 px-4 backdrop-blur dark:border-slate-800 dark:bg-surface-dark/90 sm:px-6">
      <Link to="/" className="flex items-center gap-2 font-display text-lg font-semibold tracking-tight">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white">SB</span>
        SkillBridge
      </Link>

      <div className="flex items-center gap-3">
        <button
          onClick={toggleTheme}
          aria-label="Toggle dark mode"
          className="focus-ring rounded-full p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          {dark ? <FiSun size={18} /> : <FiMoon size={18} />}
        </button>

        {user ? (
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/profile')}
              className="focus-ring flex items-center gap-2 rounded-full py-1 pl-1 pr-3 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-100 text-primary-700 dark:bg-primary-700 dark:text-primary-100">
                <FiUser size={14} />
              </span>
              <span className="hidden text-sm font-medium sm:inline">{user.name}</span>
            </button>
            <button
              onClick={() => {
                logout()
                navigate('/login')
              }}
              aria-label="Log out"
              className="focus-ring rounded-full p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              <FiLogOut size={18} />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link
              to="/login"
              className="focus-ring rounded-lg px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              Log in
            </Link>
            <Link
              to="/register"
              className="focus-ring rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-600"
            >
              Sign up
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}