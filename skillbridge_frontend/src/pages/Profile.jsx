import { useState } from 'react'
import { toast } from 'react-toastify'
import { FiUser } from 'react-icons/fi'
import { useAuth } from '../context/AuthContext.jsx'
import { useData } from '../context/DataContext.jsx'

export default function Profile() {
  const { user, updateProfile } = useAuth()
  const { skills } = useData()
  const [form, setForm] = useState(user)

  const handleSubmit = (e) => {
    e.preventDefault()
    updateProfile(form)
    toast.success('Profile updated.')
  }

  const field = (label, key) => (
    <>
      <label className="mt-4 block text-sm font-medium">{label}</label>
      <input
        value={form[key] || ''}
        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
        className="focus-ring mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-slate-700 dark:bg-surface-dark"
      />
    </>
  )

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="font-display text-2xl font-semibold">Profile</h1>
      <p className="text-sm text-slate-500 dark:text-slate-400">Keep your details up to date.</p>

      <form onSubmit={handleSubmit} className="mt-6 rounded-xl border border-slate-200 bg-white p-6 shadow-card dark:border-slate-800 dark:bg-surface-dark">
        <div className="flex items-center gap-4">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-50 text-primary-700 dark:bg-primary-700/15 dark:text-primary-400">
            <FiUser size={26} />
          </span>
          <div>
            <p className="font-display font-semibold">{user?.name}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">{user?.email}</p>
          </div>
        </div>

        {field('Full name', 'name')}
        {field('University', 'university')}
        {field('Department', 'department')}

        <label className="mt-4 block text-sm font-medium">Skills</label>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          {skills.items.map((s) => s.name).join(', ') || 'No skills added yet.'}
        </p>

        <button type="submit" className="focus-ring mt-6 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-600">
          Save changes
        </button>
      </form>
    </div>
  )
}
