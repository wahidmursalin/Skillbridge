import { FiCode, FiAward, FiFolder, FiBriefcase } from 'react-icons/fi'
import { useAuth } from '../context/AuthContext.jsx'
import { useData } from '../context/DataContext.jsx'
import StatCard from '../components/StatCard.jsx'
import ProgressChart from '../components/ProgressChart.jsx'
import { statusTone } from '../components/JobCard.jsx'

export default function Dashboard() {
  const { user } = useAuth()
  const { skills, certificates, projects, jobs } = useData()

  const interviews = jobs.items.filter((j) => j.status === 'Interview').length

  return (
    <div className="mx-auto max-w-6xl">
      <h1 className="font-display text-2xl font-semibold">Welcome, {user?.name} 👋</h1>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Here's where your bridge stands today.</p>

      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-5">
        <StatCard icon={FiCode} label="Skills" value={skills.items.length} tone="primary" />
        <StatCard icon={FiAward} label="Certificates" value={certificates.items.length} tone="success" />
        <StatCard icon={FiFolder} label="Projects" value={projects.items.length} tone="primary" />
        <StatCard icon={FiBriefcase} label="Applied Jobs" value={jobs.items.length} tone="warning" />
        <StatCard icon={FiBriefcase} label="Interviews" value={interviews} tone="danger" />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-card dark:border-slate-800 dark:bg-surface-dark lg:col-span-2">
          <p className="font-display font-semibold">Skill progress</p>
          <p className="mb-4 text-xs text-slate-500 dark:text-slate-400">Skills logged over the last 6 months</p>
          <ProgressChart labels={['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']} data={[2, 4, 5, 7, 9, skills.items.length]} />
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-card dark:border-slate-800 dark:bg-surface-dark">
          <p className="font-display font-semibold">Recent activity</p>
          <ul className="mt-4 space-y-3">
            {jobs.items.slice(0, 4).map((j) => (
              <li key={j.id} className="flex items-center justify-between text-sm">
                <div>
                  <p className="font-medium">{j.position}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{j.company}</p>
                </div>
                <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${statusTone[j.status]}`}>{j.status}</span>
              </li>
            ))}
            {jobs.items.length === 0 && <p className="text-sm text-slate-400">No applications yet.</p>}
          </ul>
        </div>
      </div>
    </div>
  )
}
