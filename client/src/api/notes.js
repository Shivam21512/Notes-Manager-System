import api from './axios'

export const getNotes = () => api.get('/notes')
export const createNote = (payload) => api.post('/notes', payload)
export const updateNote = (id, payload) => api.put(`/notes/${id}`, payload)
export const deleteNote = (id) => api.delete(`/notes/${id}`)