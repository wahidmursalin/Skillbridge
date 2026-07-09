import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAuth } from '../context/AuthContext.jsx'

export default function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.password) {
      toast.error('Please fill in all fields.')
      return
    }
    if (form.password !== form.confirm) {
      toast.error('Passwords do not match.')
      return
    }
    setSubmitting(true)
    try {
      await register(form)
      toast.success('Account created!')
      navigate('/dashboard')
    } catch (err) {
      toast.error(err.message || 'Registration failed.')
    } finally {
      setSubmitting(false)
    }
  }

  const field = (label, key, type = 'text') => (
    <>
      <label className="mt-4 block text-sm font-medium">{label}</label>
      <input
        type={type}
        value={form[key]}
        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
        className="focus-ring mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-slate-700 dark:bg-surface-dark"
      />
    </>
  )

  return (
    <div className="flex min-h-screen items-center justify-center bg-bridge-dots px-4 [background-size:22px_22px]">
      <form onSubmit={handleSubmit} className="w-full max-w-sm rounded-xl border border-slate-200 bg-white p-8 shadow-card dark:border-slate-800 dark:bg-surface-dark">
        <Link to="/" className="flex items-center gap-2 font-display text-lg font-semibold">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white">SB</span>
          SkillBridge
        </Link>
        <h1 className="mt-6 font-display text-xl font-semibold">Create your account</h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Start bridging skills to opportunities.</p>

        {field('Full name', 'name')}
        {field('Email', 'email', 'email')}
        {field('Password', 'password', 'password')}
        {field('Confirm password', 'confirm', 'password')}

        <button
          type="submit"
          disabled={submitting}
          className="focus-ring mt-6 w-full rounded-lg bg-primary py-2.5 text-sm font-semibold text-white hover:bg-primary-600 disabled:opacity-60"
        >
          {submitting ? 'Creating account…' : 'Register'}
        </button>

        <p className="mt-4 text-center text-sm text-slate-500 dark:text-slate-400">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-primary hover:underline">
            Log in
          </Link>
        </p>
      </form>
    </div>
  )
}
