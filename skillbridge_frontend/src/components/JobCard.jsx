import { FiEdit2, FiTrash2 } from 'react-icons/fi'

export const statusTone = {
  Applied: 'bg-primary-50 text-primary-700 dark:bg-primary-700/15 dark:text-primary-400',
  Interview: 'bg-amber-50 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400',
  Selected: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400',
  Rejected: 'bg-red-50 text-red-700 dark:bg-red-500/15 dark:text-red-400'
}

export default function JobCard({ job, onEdit, onDelete }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-card dark:border-slate-800 dark:bg-surface-dark">
      <div className="flex items-start justify-between">
        <div>
          <p className="font-display font-semibold">{job.position}</p>
          <p className="text-sm text-slate-500 dark:text-slate-400">{job.company}</p>
        </div>
        <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${statusTone[job.status]}`}>{job.status}</span>
      </div>
      <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
        <span className="stat-mono">Applied {job.appliedDate || '—'}</span>
        {job.interviewDate && <span className="stat-mono">Interview {job.interviewDate}</span>}
      </div>
      {job.notes && <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">{job.notes}</p>}
      <div className="mt-3 flex justify-end gap-1">
        <button onClick={() => onEdit(job)} className="focus-ring rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800">
          <FiEdit2 size={14} />
        </button>
        <button onClick={() => onDelete(job.id)} className="focus-ring rounded-lg p-1.5 text-slate-400 hover:bg-red-50 hover:text-danger dark:hover:bg-red-500/10">
          <FiTrash2 size={14} />
        </button>
      </div>
    </div>
  )
}
