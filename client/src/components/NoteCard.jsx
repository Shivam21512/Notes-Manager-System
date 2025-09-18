import React from 'react'
import { motion } from 'framer-motion'
import { Edit3, Trash2 } from 'lucide-react'

export default function NoteCard({ note, onEdit, onDelete }){
  return (
    <motion.div layout initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="bg-white rounded-2xl p-4 card-shadow">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold text-lg">{note.title}</h3>
          <p className="text-sm text-slate-600 mt-2 line-clamp-3">{note.description}</p>
        </div>
        <div className="flex flex-col gap-2 items-end">
          <button onClick={() => onEdit(note)} className="p-2 rounded hover:bg-slate-100"><Edit3 size={18} /></button>
          <button onClick={() => onDelete(note)} className="p-2 rounded hover:bg-slate-100 text-red-600"><Trash2 size={18} /></button>
        </div>
      </div>
    </motion.div>
  )
}