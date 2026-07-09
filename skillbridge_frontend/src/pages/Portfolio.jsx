import { useMemo, useState } from 'react'
import { FiPlus } from 'react-icons/fi'
import { toast } from 'react-toastify'
import { useData } from '../context/DataContext.jsx'
import { useDebounce } from '../hooks/useDebounce.js'
import ProjectCard from '../components/ProjectCard.jsx'
import SearchBar from '../components/SearchBar.jsx'
import Modal from '../components/Modal.jsx'
import EmptyState from '../components/EmptyState.jsx'

const empty = { title: '', description: '', tech: '', github: '', demo: '' }

export default function Portfolio() {
  const { projects } = useData()
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(empty)

  const filtered = useMemo(
    () => projects.items.filter((p) => p.title.toLowerCase().includes(debouncedQuery.toLowerCase())),
    [projects.items, debouncedQuery]
  )

  const openAdd = () => {
    setEditing(null)
    setForm(empty)
    setModalOpen(true)
  }
  const openEdit = (project) => {
    setEditing(project)
    setForm(project)
    setModalOpen(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.title.trim()) return toast.error('Project title is required.')
    if (editing) {
      projects.update(editing.id, form)
      toast.success('Project updated.')
    } else {
      projects.add(form)
      toast.success('Project added.')
    }
    setModalOpen(false)
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
          <h1 className="font-display text-2xl font-semibold">Portfolio</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Proof of what you've built.</p>
        </div>
        <div className="flex items-center gap-3">
          <SearchBar value={query} onChange={setQuery} placeholder="Search projects…" />
          <button onClick={openAdd} className="focus-ring flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-600">
            <FiPlus size={16} /> Add project
          </button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="mt-8">
          <EmptyState title="No projects yet" hint="Showcase the first thing you've built." />
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <ProjectCard key={p.id} project={p} onEdit={openEdit} onDelete={(id) => { projects.remove(id); toast.info('Project removed.') }} />
          ))}
        </div>
      )}

      <Modal open={modalOpen} title={editing ? 'Edit project' : 'Add project'} onClose={() => setModalOpen(false)}>
        <form onSubmit={handleSubmit}>
          {field('Project title', 'title')}
          <label className="mt-4 block text-sm font-medium">Description</label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows={3}
            className="focus-ring mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-slate-700 dark:bg-surface-dark"
          />
          {field('Technology used', 'tech')}
          {field('GitHub link', 'github', 'url')}
          {field('Live demo link', 'demo', 'url')}
          <button type="submit" className="focus-ring mt-6 w-full rounded-lg bg-primary py-2.5 text-sm font-semibold text-white hover:bg-primary-600">
            {editing ? 'Save changes' : 'Add project'}
          </button>
        </form>
      </Modal>
    </div>
  )
}
