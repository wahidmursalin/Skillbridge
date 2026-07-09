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

// Builds the four get/add/update/delete calls for a resource, since
// skills, certificates, projects, and jobs all follow the same REST shape.
function resource(path) {
  return {
    list: () => request(`/${path}`),
    add: (data) => request(`/${path}`, { method: 'POST', body: JSON.stringify(data) }),
    update: (id, data) => request(`/${path}/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    remove: (id) => request(`/${path}/${id}`, { method: 'DELETE' })
  }
}

export const api = {
  register: (data) => request('/register', { method: 'POST', body: JSON.stringify(data) }),
  login: (data) => request('/login', { method: 'POST', body: JSON.stringify(data) }),
  me: () => request('/me'),
  updateMe: (data) => request('/me', { method: 'PUT', body: JSON.stringify(data) }),

  skills: resource('skills'),
  certificates: resource('certificates'),
  projects: resource('projects'),
  jobs: resource('jobs')
}
