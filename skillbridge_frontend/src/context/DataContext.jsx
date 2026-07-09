import { createContext, useContext, useEffect, useState } from 'react'

const DataContext = createContext(null)

const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6)

const SEED = {
  skills: [
    { id: uid(), name: 'React', level: 'Advanced' },
    { id: uid(), name: 'JavaScript', level: 'Advanced' },
    { id: uid(), name: 'Java', level: 'Intermediate' },
    { id: uid(), name: 'Node.js', level: 'Intermediate' },
    { id: uid(), name: 'MongoDB', level: 'Beginner' }
  ],
  certificates: [
    { id: uid(), name: 'Meta Front-End Developer', org: 'Coursera', issueDate: '2025-03-10', link: 'https://coursera.org' },
    { id: uid(), name: 'JavaScript Algorithms', org: 'freeCodeCamp', issueDate: '2024-11-02', link: 'https://freecodecamp.org' }
  ],
  projects: [
    { id: uid(), title: 'SkillBridge', description: 'Career tracker for SE students.', tech: 'React, Tailwind, Node', github: 'https://github.com', demo: '' },
    { id: uid(), title: 'Campus Marketplace', description: 'Buy/sell platform for students.', tech: 'React, Express, MongoDB', github: 'https://github.com', demo: '' }
  ],
  jobs: [
    { id: uid(), company: 'Brain Station 23', position: 'Jr. Software Engineer', status: 'Applied', appliedDate: '2026-06-01', interviewDate: '', notes: '' },
    { id: uid(), company: 'Pathao', position: 'Frontend Engineer Intern', status: 'Interview', appliedDate: '2026-05-20', interviewDate: '2026-07-15', notes: 'Round 2 on Tuesday' },
    { id: uid(), company: 'Therap BD', position: 'Software Engineer', status: 'Rejected', appliedDate: '2026-04-11', interviewDate: '', notes: '' }
  ]
}

function useCollection(key) {
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem(key)
    return saved ? JSON.parse(saved) : SEED[key]
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(items))
  }, [key, items])

  const add = (item) => setItems((prev) => [{ id: uid(), ...item }, ...prev])
  const update = (id, patch) => setItems((prev) => prev.map((i) => (i.id === id ? { ...i, ...patch } : i)))
  const remove = (id) => setItems((prev) => prev.filter((i) => i.id !== id))

  return { items, add, update, remove }
}

export function DataProvider({ children }) {
  const skills = useCollection('skills')
  const certificates = useCollection('certificates')
  const projects = useCollection('projects')
  const jobs = useCollection('jobs')

  return (
    <DataContext.Provider value={{ skills, certificates, projects, jobs }}>
      {children}
    </DataContext.Provider>
  )
}

export const useData = () => useContext(DataContext)
