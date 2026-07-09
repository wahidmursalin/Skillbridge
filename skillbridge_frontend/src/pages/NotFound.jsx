import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <span className="stat-mono font-display text-6xl font-bold text-primary">404</span>
      <h1 className="mt-4 font-display text-xl font-semibold">This bridge doesn't lead anywhere</h1>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">The page you're looking for doesn't exist.</p>
      <Link to="/" className="focus-ring mt-6 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-600">
        Back to home
      </Link>
    </div>
  )
}
