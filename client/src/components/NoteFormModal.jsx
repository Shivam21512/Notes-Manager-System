import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function NoteFormModal({ open, onClose, onSubmit, initial }){
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  useEffect(()=>{
    if (initial) {
      setTitle(initial.title || '')
      setDescription(initial.description || '')
    } else {
      setTitle('')
      setDescription('')
    }
  }, [initial, open])

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({ title: title.trim(), description: description.trim(), _id: initial?._id })
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center">
          <div onClick={onClose} className="absolute inset-0 bg-black/30" />
          <motion.div initial={{ scale: 0.96, y: 10 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.96, y: 10 }} className="relative bg-white rounded-2xl w-full max-w-xl p-6 z-10 card-shadow">
            <h3 className="text-lg font-semibold">{initial ? 'Edit Note' : 'Create Note'}</h3>
            <form className="mt-4" onSubmit={handleSubmit}>
              <label className="block text-sm font-medium text-slate-700">Title</label>
              <input value={title} onChange={(e)=>setTitle(e.target.value)} required className="mt-1 w-full rounded-md border px-3 py-2" />

              <label className="block text-sm font-medium text-slate-700 mt-4">Description</label>
              <textarea value={description} onChange={(e)=>setDescription(e.target.value)} rows={6} className="mt-1 w-full rounded-md border px-3 py-2" />

              <div className="mt-4 flex items-center justify-end gap-3">
                <button type="button" onClick={onClose} className="px-4 py-2 rounded-md">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded-md bg-primary-600 text-white">{initial ? 'Save Changes' : 'Create'}</button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}