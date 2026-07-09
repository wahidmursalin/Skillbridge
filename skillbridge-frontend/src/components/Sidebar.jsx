import { NavLink } from 'react-router-dom'
import { FiGrid, FiCode, FiAward, FiFolder, FiBriefcase, FiUser } from 'react-icons/fi'

const links = [
  { to: '/dashboard', label: 'Dashboard', icon: FiGrid },
  { to: '/skills', label: 'Skills', icon: FiCode },
  { to: '/certificates', label: 'Certificates', icon: FiAward },
  { to: '/portfolio', label: 'Portfolio', icon: FiFolder },
  { to: '/jobs', label: 'Job Tracker', icon: FiBriefcase },
  { to: '/profile', label: 'Profile', icon: FiUser }
]

export default function Sidebar() {
  return (
    <aside className="hidden w-56 shrink-0 border-r border-slate-200 bg-white px-3 py-6 dark:border-slate-800 dark:bg-surface-dark md:block">
      <nav className="flex flex-col gap-1">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `focus-ring flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-primary-50 text-primary-700 dark:bg-primary-700/20 dark:text-primary-400'
                  : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
              }`
            }
          >
            <Icon size={17} />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
