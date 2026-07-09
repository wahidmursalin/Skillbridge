import { Link } from 'react-router-dom'
import { FiCode, FiAward, FiFolder, FiBriefcase } from 'react-icons/fi'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'

const steps = [
  { icon: FiCode, title: 'Log your skills', text: 'Track what you know and how well you know it.' },
  { icon: FiAward, title: 'Add certificates', text: 'Keep every credential in one place, ready to share.' },
  { icon: FiFolder, title: 'Build your portfolio', text: 'Turn side projects into proof of your work.' },
  { icon: FiBriefcase, title: 'Track applications', text: 'See exactly where every job application stands.' }
]

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        <section className="relative overflow-hidden px-6 py-20 sm:py-28">
          <div className="absolute inset-0 -z-10 bg-bridge-dots [background-size:22px_22px] opacity-40" />
          <div className="mx-auto max-w-3xl text-center">
            <span className="stat-mono inline-block rounded-full border border-primary-100 bg-primary-50 px-3 py-1 text-xs font-medium text-primary-700 dark:border-primary-700/40 dark:bg-primary-700/15 dark:text-primary-400">
              built for software engineering students
            </span>
            <h1 className="mt-6 font-display text-4xl font-bold tracking-tight sm:text-5xl">
              Your career, <span className="text-primary">one skill at a time.</span>
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-slate-500 dark:text-slate-400">
              SkillBridge connects what you're learning to what you've built, and what you've built to
              the jobs you're chasing — all in one dashboard.
            </p>
            <div className="mt-8 flex justify-center gap-3">
              <Link to="/register" className="focus-ring rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-600">
                Get started
              </Link>
              <Link to="/login" className="focus-ring rounded-lg border border-slate-200 px-5 py-2.5 text-sm font-semibold hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800">
                Log in
              </Link>
            </div>
          </div>
        </section>

        <section className="bridge-path mx-auto grid max-w-5xl grid-cols-1 gap-6 px-6 pb-24 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(({ icon: Icon, title, text }, i) => (
            <div key={title} className="relative z-10 rounded-xl border border-slate-200 bg-white p-5 shadow-card dark:border-slate-800 dark:bg-surface-dark">
              <span className="stat-mono text-xs text-primary">{String(i + 1).padStart(2, '0')}</span>
              <span className="mt-2 flex h-9 w-9 items-center justify-center rounded-lg bg-primary-50 text-primary-700 dark:bg-primary-700/15 dark:text-primary-400">
                <Icon size={17} />
              </span>
              <p className="mt-3 font-display font-semibold">{title}</p>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{text}</p>
            </div>
          ))}
        </section>

        <section className="border-t border-slate-200 px-6 py-16 text-center dark:border-slate-800">
          <h2 className="font-display text-2xl font-semibold">Ready to bridge the gap?</h2>
          <p className="mt-2 text-slate-500 dark:text-slate-400">Create your free account and start tracking today.</p>
          <Link to="/register" className="focus-ring mt-6 inline-block rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-600">
            Create account
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  )
}
