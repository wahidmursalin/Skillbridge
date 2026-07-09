import { FiX } from 'react-icons/fi'

export default function Modal({ open, title, onClose, children }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4" onClick={onClose}>
      <div
        className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl dark:bg-surface-dark"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold">{title}</h2>
          <button onClick={onClose} className="focus-ring rounded-full p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800">
            <FiX size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}
