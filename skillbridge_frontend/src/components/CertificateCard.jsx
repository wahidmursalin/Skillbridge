import { FiEdit2, FiTrash2, FiExternalLink, FiAward } from 'react-icons/fi'

export default function CertificateCard({ cert, onEdit, onDelete }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-card dark:border-slate-800 dark:bg-surface-dark">
      <div className="flex items-start justify-between">
        <span className="rounded-lg bg-primary-50 p-2 text-primary-700 dark:bg-primary-700/15 dark:text-primary-400">
          <FiAward size={16} />
        </span>
        <div className="flex gap-1">
          <button onClick={() => onEdit(cert)} className="focus-ring rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800">
            <FiEdit2 size={14} />
          </button>
          <button onClick={() => onDelete(cert.id)} className="focus-ring rounded-lg p-1.5 text-slate-400 hover:bg-red-50 hover:text-danger dark:hover:bg-red-500/10">
            <FiTrash2 size={14} />
          </button>
        </div>
      </div>
      <p className="mt-3 font-display font-semibold">{cert.name}</p>
      <p className="text-sm text-slate-500 dark:text-slate-400">{cert.org}</p>
      <div className="mt-2 flex items-center justify-between text-xs text-slate-400">
        <span className="stat-mono">{cert.issueDate}</span>
        {cert.link && (
          <a href={cert.link} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-primary hover:underline">
            View <FiExternalLink size={12} />
          </a>
        )}
      </div>
    </div>
  )
}
