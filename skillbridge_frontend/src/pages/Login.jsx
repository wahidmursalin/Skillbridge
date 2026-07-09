import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAuth } from '../context/AuthContext.jsx'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '', remember: true })
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.email || !form.password) {
      toast.error('Please fill in both fields.')
      return
    }
    setSubmitting(true)
    setTimeout(() => {
      login(form)
      toast.success('Welcome back!')
      setSubmitting(false)
      navigate('/dashboard')
    }, 400)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-bridge-dots px-4 [background-size:22px_22px]">
      <form onSubmit={handleSubmit} className="w-full max-w-sm rounded-xl border border-slate-200 bg-white p-8 shadow-card dark:border-slate-800 dark:bg-surface-dark">
        <Link to="/" className="flex items-center gap-2 font-display text-lg font-semibold">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white">SB</span>
          SkillBridge
        </Link>
        <h1 className="mt-6 font-display text-xl font-semibold">Log in</h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Track your progress from anywhere.</p>

        <label className="mt-6 block text-sm font-medium">Email</label>
        <input
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="focus-ring mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-slate-700 dark:bg-surface-dark"
          placeholder="you@university.edu"
        />

        <label className="mt-4 block text-sm font-medium">Password</label>
        <input
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="focus-ring mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-slate-700 dark:bg-surface-dark"
          placeholder="••••••••"
        />

        <label className="mt-4 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
          <input
            type="checkbox"
            checked={form.remember}
            onChange={(e) => setForm({ ...form, remember: e.target.checked })}
            className="rounded border-slate-300"
          />
          Remember me
        </label>

        <button
          type="submit"
          disabled={submitting}
          className="focus-ring mt-6 w-full rounded-lg bg-primary py-2.5 text-sm font-semibold text-white hover:bg-primary-600 disabled:opacity-60"
        >
          {submitting ? 'Logging in…' : 'Log in'}
        </button>

        <p className="mt-4 text-center text-sm text-slate-500 dark:text-slate-400">
          New here?{' '}
          <Link to="/register" className="font-medium text-primary hover:underline">
            Create an account
          </Link>
        </p>
      </form>
    </div>
  )
}
