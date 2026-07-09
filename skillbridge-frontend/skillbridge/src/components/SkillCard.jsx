import { FiEdit2, FiTrash2 } from 'react-icons/fi'

const levelTone = {
  Beginner: 'bg-amber-50 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400',
  Intermediate: 'bg-primary-50 text-primary-700 dark:bg-primary-700/15 dark:text-primary-400',
  Advanced: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400'
}

export default function SkillCard({ skill, onEdit, onDelete }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-card dark:border-slate-800 dark:bg-surface-dark">
      <div>
        <p className="font-display font-semibold">{skill.name}</p>
        <span className={`mt-1 inline-block rounded-full px-2 py-0.5 text-xs font-medium ${levelTone[skill.level]}`}>
          {skill.level}
        </span>
      </div>
      <div className="flex gap-1">
        <button onClick={() => onEdit(skill)} aria-label={`Edit ${skill.name}`} className="focus-ring rounded-lg p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800">
          <FiEdit2 size={15} />
        </button>
        <button onClick={() => onDelete(skill.id)} aria-label={`Delete ${skill.name}`} className="focus-ring rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-danger dark:hover:bg-red-500/10">
          <FiTrash2 size={15} />
        </button>
      </div>
    </div>
  )
}
