// backend/src/controllers/adminController.js
import asyncHandler from 'express-async-handler'
import User from '../models/User.js'
import Note from '../models/Note.js'

// @desc List all users
// @route GET /api/admin/users
// @access Admin
export const listUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select('-password').sort({ createdAt: -1 })
  res.json(users)
})

// @desc List all notes (with user email populated)
// @route GET /api/admin/notes
// @access Admin
export const listAllNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find().populate('user', 'email').sort({ createdAt: -1 })
  res.json(notes)
})
