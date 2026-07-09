import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext(null)

/*
  Phase 1 note: this is a frontend-only mock auth so the app is fully
  clickable before the Express + MongoDB backend (Phase 4) exists.
  Swap the three functions below for real calls to src/services/api.js
  once the backend is ready — the rest of the app never has to change,
  it only talks to this context.
*/
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('sb_user')
    return saved ? JSON.parse(saved) : null
  })

  useEffect(() => {
    if (user) localStorage.setItem('sb_user', JSON.stringify(user))
    else localStorage.removeItem('sb_user')
  }, [user])

  const login = ({ email }) => {
    setUser({
      name: email.split('@')[0] || 'Student',
      email,
      university: 'Jahangirnagar University',
      department: 'Software Engineering',
      avatar: null
    })
  }

  const register = ({ name, email }) => {
    setUser({
      name,
      email,
      university: '',
      department: '',
      avatar: null
    })
  }

  const updateProfile = (patch) => setUser((u) => ({ ...u, ...patch }))

  const logout = () => setUser(null)

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
