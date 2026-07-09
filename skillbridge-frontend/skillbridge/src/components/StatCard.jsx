const tones = {
  primary: 'bg-primary-50 text-primary-700 dark:bg-primary-700/15 dark:text-primary-400',
  success: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400',
  warning: 'bg-amber-50 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400',
  danger: 'bg-red-50 text-red-700 dark:bg-red-500/15 dark:text-red-400'
}

export default function StatCard({ icon: Icon, label, value, tone = 'primary' }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-card dark:border-slate-800 dark:bg-surface-dark">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-slate-500 dark:text-slate-400">{label}</span>
        <span className={`rounded-lg p-2 ${tones[tone]}`}>
          <Icon size={16} />
        </span>
      </div>
      <p className="stat-mono mt-3 text-3xl font-semibold">{value}</p>
    </div>
  )
}
