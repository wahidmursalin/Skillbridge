import { useMemo, useState } from 'react'
import { FiPlus } from 'react-icons/fi'
import { toast } from 'react-toastify'
import { useData } from '../context/DataContext.jsx'
import { useDebounce } from '../hooks/useDebounce.js'
import JobCard from '../components/JobCard.jsx'
import SearchBar from '../components/SearchBar.jsx'
import Modal from '../components/Modal.jsx'
import EmptyState from '../components/EmptyState.jsx'

const STATUSES = ['Applied', 'Interview', 'Selected', 'Rejected']
const empty = { company: '', position: '', status: 'Applied', appliedDate: '', interviewDate: '', notes: '' }

export default function Jobs() {
  const { jobs } = useData()
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const debouncedQuery = useDebounce(query)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(empty)

  const filtered = useMemo(
    () =>
      jobs.items
        .filter((j) => j.company.toLowerCase().includes(debouncedQuery.toLowerCase()) || j.position.toLowerCase().includes(debouncedQuery.toLowerCase()))
        .filter((j) => statusFilter === 'All' || j.status === statusFilter),
    [jobs.items, debouncedQuery, statusFilter]
  )

  const openAdd = () => {
    setEditing(null)
    setForm(empty)
    setModalOpen(true)
  }
  const openEdit = (job) => {
    setEditing(job)
    setForm(job)
    setModalOpen(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.company.trim() || !form.position.trim()) return toast.error('Company and position are required.')
    try {
      if (editing) {
        await jobs.update(editing.id, form)
        toast.success('Application updated.')
      } else {
        await jobs.add(form)
        toast.success('Application added.')
      }
      setModalOpen(false)
    } catch (err) {
      toast.error(err.message || 'Something went wrong.')
    }
  }

  const handleDelete = async (id) => {
    try {
      await jobs.remove(id)
      toast.info('Application removed.')
    } catch (err) {
      toast.error(err.message || 'Could not remove application.')
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
    <div className="mx-auto max-w-5xl">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-semibold">Job Tracker</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Every application, at a glance.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <SearchBar value={query} onChange={setQuery} placeholder="Search company or role…" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="focus-ring rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-slate-700 dark:bg-surface-dark"
          >
            <option>All</option>
            {STATUSES.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
          <button onClick={openAdd} className="focus-ring flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-600">
            <FiPlus size={16} /> Add
          </button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="mt-8">
          <EmptyState title="No applications match" hint="Try a different filter, or log a new application." />
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((j) => (
            <JobCard key={j.id} job={j} onEdit={openEdit} onDelete={handleDelete} />
          ))}
        </div>
      )}

      <Modal open={modalOpen} title={editing ? 'Edit application' : 'Add application'} onClose={() => setModalOpen(false)}>
        <form onSubmit={handleSubmit}>
          {field('Company', 'company')}
          {field('Position', 'position')}
          <label className="mt-4 block text-sm font-medium">Status</label>
          <select
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
            className="focus-ring mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-slate-700 dark:bg-surface-dark"
          >
            {STATUSES.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
          {field('Application date', 'appliedDate', 'date')}
          {field('Interview date', 'interviewDate', 'date')}
          <label className="mt-4 block text-sm font-medium">Notes</label>
          <textarea
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
            rows={2}
            className="focus-ring mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-slate-700 dark:bg-surface-dark"
          />
          <button type="submit" className="focus-ring mt-6 w-full rounded-lg bg-primary py-2.5 text-sm font-semibold text-white hover:bg-primary-600">
            {editing ? 'Save changes' : 'Add application'}
          </button>
        </form>
      </Modal>
    </div>
  )
}
