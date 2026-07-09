import { FiEdit2, FiTrash2, FiGithub, FiExternalLink } from 'react-icons/fi'

export default function ProjectCard({ project, onEdit, onDelete }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-card dark:border-slate-800 dark:bg-surface-dark">
      <div className="flex items-start justify-between">
        <p className="font-display font-semibold">{project.title}</p>
        <div className="flex gap-1">
          <button onClick={() => onEdit(project)} className="focus-ring rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800">
            <FiEdit2 size={14} />
          </button>
          <button onClick={() => onDelete(project.id)} className="focus-ring rounded-lg p-1.5 text-slate-400 hover:bg-red-50 hover:text-danger dark:hover:bg-red-500/10">
            <FiTrash2 size={14} />
          </button>
        </div>
      </div>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{project.description}</p>
      <p className="mt-2 text-xs font-medium text-primary">{project.tech}</p>
      <div className="mt-3 flex gap-3 text-xs text-slate-500 dark:text-slate-400">
        {project.github && (
          <a href={project.github} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-primary">
            <FiGithub size={13} /> Code
          </a>
        )}
        {project.demo && (
          <a href={project.demo} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-primary">
            <FiExternalLink size={13} /> Live demo
          </a>
        )}
      </div>
    </div>
  )
}
