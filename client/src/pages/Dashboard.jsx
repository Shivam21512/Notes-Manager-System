import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import Navbar from '../components/Navbar'
import NoteCard from '../components/NoteCard'
import NoteFormModal from '../components/NoteFormModal'
import * as notesAPI from '../api/notes'
import { AnimatePresence, motion } from 'framer-motion'

export default function Dashboard(){
  const { user } = useContext(AuthContext)
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [error, setError] = useState(null)

  const fetchNotes = async () => {
    setLoading(true); setError(null)
    try {
      const res = await notesAPI.getNotes()
      setNotes(res.data || [])
    } catch (err) {
      setError(err?.response?.data?.message || err.message || 'Failed to load')
    } finally { setLoading(false) }
  }

  useEffect(()=>{ fetchNotes() }, [])

  const onCreate = () => { setEditing(null); setModalOpen(true) }
  const onEdit = (note) => { setEditing(note); setModalOpen(true) }
  const onDelete = async (note) => {
    if (!confirm('Delete this note?')) return
    try {
      await notesAPI.deleteNote(note._id)
      setNotes((s)=>s.filter(n=>n._id !== note._id))
    } catch (err) { alert('Delete failed') }
  }

  const handleSubmit = async (payload) => {
    try {
      if (editing) {
        const res = await notesAPI.updateNote(editing._id, payload)
        setNotes((s)=>s.map(n=> n._id === editing._id ? res.data : n))
      } else {
        const res = await notesAPI.createNote(payload)
        // prepend
        setNotes((s)=>[res.data, ...s])
      }
      setModalOpen(false)
      setEditing(null)
    } catch (err) {
      alert('Save failed')
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar onCreate={onCreate} />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Your Notes</h1>
            <p className="text-sm text-slate-600">{user?.email} — {notes.length} notes</p>
          </div>
        </div>

        <div className="mt-6">
          {loading ? (
            <div className="text-slate-500">Loading...</div>
          ) : error ? (
            <div className="text-red-600">{error}</div>
          ) : notes.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center card-shadow">
              <p className="text-slate-600">You have no notes yet. Click <span className="font-semibold">Add Note</span> to create one.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {notes.map(note => (
                  <motion.div key={note._id} layout>
                    <NoteCard note={note} onEdit={onEdit} onDelete={onDelete} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </main>

      <NoteFormModal open={modalOpen} onClose={()=>{ setModalOpen(false); setEditing(null) }} onSubmit={handleSubmit} initial={editing} />
    </div>
  )
}







// import React, { useEffect, useState, useContext } from 'react'
// import axios from 'axios'
// import { AuthContext } from '../context/AuthContext'

// export default function AdminDashboard() {
//   const { user } = useContext(AuthContext)
//   const [users, setUsers] = useState([])
//   const [notes, setNotes] = useState([])

//   useEffect(() => {
//     if (!user?.isAdmin) return

//     const fetchAdminData = async () => {
//       const config = { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
//       try {
//         const usersRes = await axios.get('/api/admin/users', config)
//         setUsers(usersRes.data)
//         const notesRes = await axios.get('/api/admin/notes', config)
//         setNotes(notesRes.data)
//       } catch (err) {
//         console.error(err)
//       }
//     }

//     fetchAdminData()
//   }, [user])

//   const handleDeleteNote = async (id) => {
//     const config = { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
//     try {
//       await axios.delete(`/api/admin/notes/${id}`, config)
//       setNotes(notes.filter(n => n._id !== id))
//     } catch (err) {
//       console.error(err)
//     }
//   }

//   if (!user?.isAdmin) return <p>Access Denied</p>

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

//       <section className="mb-6">
//         <h2 className="text-xl font-semibold">Users</h2>
//         <ul>
//           {users.map(u => (
//             <li key={u._id}>{u.email}</li>
//           ))}
//         </ul>
//       </section>

//       <section>
//         <h2 className="text-xl font-semibold">All Notes</h2>
//         <ul>
//           {notes.map(n => (
//             <li key={n._id} className="flex justify-between items-center my-2">
//               <span>{n.title} by {n.user.email}</span>
//               <button
//                 onClick={() => handleDeleteNote(n._id)}
//                 className="px-2 py-1 bg-red-600 text-white rounded"
//               >
//                 Delete
//               </button>
//             </li>
//           ))}
//         </ul>
//       </section>
//     </div>
//   )
// }
