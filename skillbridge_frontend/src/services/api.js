// Thin fetch wrapper for the future Express + MongoDB backend (Phase 4 of the
// roadmap). Nothing in the UI needs to change when the backend goes live —
// swap the mock context calls (see src/context/DataContext.jsx and
// AuthContext.jsx) for these instead.

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

async function request(path, options = {}) {
  const token = localStorage.getItem('sb_token')
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    },
    ...options
  })
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.message || `Request failed: ${res.status}`)
  }
  return res.json()
}

export const api = {
  register: (data) => request('/register', { method: 'POST', body: JSON.stringify(data) }),
  login: (data) => request('/login', { method: 'POST', body: JSON.stringify(data) }),

  getSkills: () => request('/skills'),
  addSkill: (data) => request('/skills', { method: 'POST', body: JSON.stringify(data) }),
  updateSkill: (id, data) => request(`/skills/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteSkill: (id) => request(`/skills/${id}`, { method: 'DELETE' }),

  getCertificates: () => request('/certificates'),
  addCertificate: (data) => request('/certificates', { method: 'POST', body: JSON.stringify(data) }),

  getProjects: () => request('/projects'),
  addProject: (data) => request('/projects', { method: 'POST', body: JSON.stringify(data) }),

  getJobs: () => request('/jobs'),
  addJob: (data) => request('/jobs', { method: 'POST', body: JSON.stringify(data) })
}
