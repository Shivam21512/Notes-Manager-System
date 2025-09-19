// frontend/src/api/notes.js
import api from './axios'

// Optional: get token from localStorage or context
const getAuthHeader = () => {
  const token = localStorage.getItem('token')
  return { Authorization: `Bearer ${token}` }
}

export const getNotes = () => api.get('/notes', { headers: getAuthHeader() })
export const createNote = (payload) => api.post('/notes', payload, { headers: getAuthHeader() })
export const updateNote = (id, payload) => api.put(`/notes/${id}`, payload, { headers: getAuthHeader() })
export const deleteNote = (id) => api.delete(`/notes/${id}`, { headers: getAuthHeader() })
