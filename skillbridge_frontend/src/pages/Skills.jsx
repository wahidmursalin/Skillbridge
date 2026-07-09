import { useMemo, useState } from 'react'
import { FiPlus } from 'react-icons/fi'
import { toast } from 'react-toastify'
import { useData } from '../context/DataContext.jsx'
import { useDebounce } from '../hooks/useDebounce.js'
import SkillCard from '../components/SkillCard.jsx'
import SearchBar from '../components/SearchBar.jsx'
import Modal from '../components/Modal.jsx'
import EmptyState from '../components/EmptyState.jsx'

const LEVELS = ['Beginner', 'Intermediate', 'Advanced']
const empty = { name: '', level: 'Beginner' }

export default function Skills() {
  const { skills } = useData()
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(empty)

  const filtered = useMemo(
    () => skills.items.filter((s) => s.name.toLowerCase().includes(debouncedQuery.toLowerCase())),
    [skills.items, debouncedQuery]
  )

  const openAdd = () => {
    setEditing(null)
    setForm(empty)
    setModalOpen(true)
  }

  const openEdit = (skill) => {
    setEditing(skill)
    setForm({ name: skill.name, level: skill.level })
    setModalOpen(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name.trim()) return toast.error('Skill name is required.')
    if (editing) {
      skills.update(editing.id, form)
      toast.success('Skill updated.')
    } else {
      skills.add(form)
      toast.success('Skill added.')
    }
    setModalOpen(false)
  }

  const handleDelete = (id) => {
    skills.remove(id)
    toast.info('Skill removed.')
  }

  return (
    <div className="mx-auto max-w-5xl">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-semibold">Skills</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">What you know, and how well you know it.</p>
        </div>
        <div className="flex items-center gap-3">
          <SearchBar value={query} onChange={setQuery} placeholder="Search skills…" />
          <button onClick={openAdd} className="focus-ring flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-600">
            <FiPlus size={16} /> Add skill
          </button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="mt-8">
          <EmptyState title="No skills yet" hint="Add the first skill you want to track." />
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((skill) => (
            <SkillCard key={skill.id} skill={skill} onEdit={openEdit} onDelete={handleDelete} />
          ))}
        </div>
      )}

      <Modal open={modalOpen} title={editing ? 'Edit skill' : 'Add skill'} onClose={() => setModalOpen(false)}>
        <form onSubmit={handleSubmit}>
          <label className="block text-sm font-medium">Skill name</label>
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="focus-ring mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-slate-700 dark:bg-surface-dark"
            placeholder="e.g. TypeScript"
          />
          <label className="mt-4 block text-sm font-medium">Level</label>
          <select
            value={form.level}
            onChange={(e) => setForm({ ...form, level: e.target.value })}
            className="focus-ring mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-slate-700 dark:bg-surface-dark"
          >
            {LEVELS.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
          <button type="submit" className="focus-ring mt-6 w-full rounded-lg bg-primary py-2.5 text-sm font-semibold text-white hover:bg-primary-600">
            {editing ? 'Save changes' : 'Add skill'}
          </button>
        </form>
      </Modal>
    </div>
  )
}
