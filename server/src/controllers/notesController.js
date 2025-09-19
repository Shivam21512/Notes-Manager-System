// backend/src/controllers/notesController.js
import asyncHandler from 'express-async-handler'
import mongoose from 'mongoose'
import Note from '../models/Note.js'

// @desc Create a note
// @route POST /api/notes
// @access Private
export const createNote = asyncHandler(async (req, res) => {
  const { title, description } = req.body
  if (!title || !description) {
    res.status(400)
    throw new Error('Title and description are required')
  }
  const note = await Note.create({ title, description, user: req.user._id })
  res.status(201).json(note)
})

// @desc Get notes for logged-in user
// @route GET /api/notes
// @access Private
export const getNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find({ user: req.user._id }).sort({ createdAt: -1 })
  res.json(notes)
})

// @desc Update a note
// @route PUT /api/notes/:id
// @access Private
export const updateNote = asyncHandler(async (req, res) => {
  const { title, description } = req.body

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400)
    throw new Error('Invalid note ID')
  }

  const note = await Note.findById(req.params.id)
  if (!note) {
    res.status(404)
    throw new Error('Note not found')
  }

  if (note.user.toString() !== req.user._id.toString()) {
    res.status(403)
    throw new Error('Not authorized to update this note')
  }

  note.title = title ?? note.title
  note.description = description ?? note.description
  const updated = await note.save()
  res.json(updated)
})

// @desc Delete a note
// @route DELETE /api/notes/:id
// @access Private
export const deleteNote = asyncHandler(async (req, res) => {
  const noteId = req.params.id
  console.log('Delete note ID:', noteId)
  console.log('User:', req.user)

  if (!mongoose.Types.ObjectId.isValid(noteId)) {
    res.status(400)
    throw new Error('Invalid note ID')
  }

  if (!req.user) {
    res.status(401)
    throw new Error('Not authorized, no user')
  }

  const note = await Note.findById(noteId)
  if (!note) {
    res.status(404)
    throw new Error('Note not found')
  }

  if (note.user.toString() !== req.user._id.toString() && !req.user.isAdmin) {
    res.status(403)
    throw new Error('Not authorized to delete this note')
  }

  // Use deleteOne to avoid deprecated remove()
  await Note.deleteOne({ _id: noteId })
  res.json({ message: 'Note removed' })
})
