import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { api } from '../services/api.js'
import { useAuth } from './AuthContext.jsx'

const DataContext = createContext(null)

function useCollection(resource) {
  const { user } = useAuth()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  const refresh = useCallback(() => {
    if (!user) {
      setItems([])
      setLoading(false)
      return
    }
    setLoading(true)
    resource
      .list()
      .then(setItems)
      .catch(() => setItems([]))
      .finally(() => setLoading(false))
  }, [user, resource])

  useEffect(() => {
    refresh()
  }, [refresh])

  const add = async (data) => {
    const created = await resource.add(data)
    setItems((prev) => [created, ...prev])
  }

  const update = async (id, patch) => {
    const updated = await resource.update(id, patch)
    setItems((prev) => prev.map((i) => (i._id === id ? updated : i)))
  }

  const remove = async (id) => {
    await resource.remove(id)
    setItems((prev) => prev.filter((i) => i._id !== id))
  }

  // The rest of the app (cards, forms) was built against a plain `id`
  // field; Mongo returns `_id`. Normalize once here so nothing else has
  // to change.
  const normalized = items.map((i) => ({ ...i, id: i._id }))

  return { items: normalized, loading, add, update, remove, refresh }
}

export function DataProvider({ children }) {
  const skills = useCollection(api.skills)
  const certificates = useCollection(api.certificates)
  const projects = useCollection(api.projects)
  const jobs = useCollection(api.jobs)

  return (
    <DataContext.Provider value={{ skills, certificates, projects, jobs }}>
      {children}
    </DataContext.Provider>
  )
}

export const useData = () => useContext(DataContext)
