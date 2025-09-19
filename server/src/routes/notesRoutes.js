// backend/src/routes/notesRoutes.js
import express from 'express'
import { protect } from '../middleware/authMiddleware.js'
import { getNotes, createNote, updateNote, deleteNote } from '../controllers/notesController.js'

const router = express.Router()

router.route('/')
  .get(protect, getNotes)
  .post(protect, createNote)

router.route('/:id')
  .put(protect, updateNote)
  .delete(protect, deleteNote)

export default router
