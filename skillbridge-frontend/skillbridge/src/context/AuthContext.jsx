import { createContext, useContext, useEffect, useState } from 'react'
import { api } from '../services/api.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // On first load, if we already have a token, ask the API who we are
  // instead of trusting stale localStorage data.
  useEffect(() => {
    const token = localStorage.getItem('sb_token')
    if (!token) {
      setLoading(false)
      return
    }
    api
      .me()
      .then(({ user }) => setUser(user))
      .catch(() => localStorage.removeItem('sb_token'))
      .finally(() => setLoading(false))
  }, [])

  const login = async ({ email, password }) => {
    const { token, user } = await api.login({ email, password })
    localStorage.setItem('sb_token', token)
    setUser(user)
  }

  const register = async ({ name, email, password }) => {
    const { token, user } = await api.register({ name, email, password })
    localStorage.setItem('sb_token', token)
    setUser(user)
  }

  const updateProfile = async (patch) => {
    const { user } = await api.updateMe(patch)
    setUser(user)
  }

  const logout = () => {
    localStorage.removeItem('sb_token')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
