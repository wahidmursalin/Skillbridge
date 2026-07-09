import { useMemo, useState } from 'react'
import { FiPlus } from 'react-icons/fi'
import { toast } from 'react-toastify'
import { useData } from '../context/DataContext.jsx'
import { useDebounce } from '../hooks/useDebounce.js'
import CertificateCard from '../components/CertificateCard.jsx'
import SearchBar from '../components/SearchBar.jsx'
import Modal from '../components/Modal.jsx'
import EmptyState from '../components/EmptyState.jsx'

const empty = { name: '', org: '', issueDate: '', link: '' }

export default function Certificates() {
  const { certificates } = useData()
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(empty)

  const filtered = useMemo(
    () => certificates.items.filter((c) => c.name.toLowerCase().includes(debouncedQuery.toLowerCase())),
    [certificates.items, debouncedQuery]
  )

  const openAdd = () => {
    setEditing(null)
    setForm(empty)
    setModalOpen(true)
  }
  const openEdit = (cert) => {
    setEditing(cert)
    setForm(cert)
    setModalOpen(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name.trim() || !form.org.trim()) return toast.error('Name and organization are required.')
    if (editing) {
      certificates.update(editing.id, form)
      toast.success('Certificate updated.')
    } else {
      certificates.add(form)
      toast.success('Certificate added.')
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
          <h1 className="font-display text-2xl font-semibold">Certificates</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Every credential, ready to share.</p>
        </div>
        <div className="flex items-center gap-3">
          <SearchBar value={query} onChange={setQuery} placeholder="Search certificates…" />
          <button onClick={openAdd} className="focus-ring flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-600">
            <FiPlus size={16} /> Add
          </button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="mt-8">
          <EmptyState title="No certificates yet" hint="Add a certificate you've earned." />
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((c) => (
            <CertificateCard key={c.id} cert={c} onEdit={openEdit} onDelete={(id) => { certificates.remove(id); toast.info('Certificate removed.') }} />
          ))}
        </div>
      )}

      <Modal open={modalOpen} title={editing ? 'Edit certificate' : 'Add certificate'} onClose={() => setModalOpen(false)}>
        <form onSubmit={handleSubmit}>
          {field('Certificate name', 'name')}
          {field('Organization', 'org')}
          {field('Issue date', 'issueDate', 'date')}
          {field('Credential link', 'link', 'url')}
          <button type="submit" className="focus-ring mt-6 w-full rounded-lg bg-primary py-2.5 text-sm font-semibold text-white hover:bg-primary-600">
            {editing ? 'Save changes' : 'Add certificate'}
          </button>
        </form>
      </Modal>
    </div>
  )
}
