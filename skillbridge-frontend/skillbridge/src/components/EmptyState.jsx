export default function EmptyState({ title, hint, action }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 py-16 text-center dark:border-slate-700">
      <p className="font-display text-base font-semibold">{title}</p>
      {hint && <p className="max-w-sm text-sm text-slate-500 dark:text-slate-400">{hint}</p>}
      {action}
    </div>
  )
}
