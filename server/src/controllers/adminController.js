// Make sure you actually export the functions
// export const getAllUsers = async (req, res) => {
//   res.json({ message: 'all users' })
// }

// export const getAllNotes = async (req, res) => {
//   res.json({ message: 'all notes' })
// }

// import asyncHandler from 'express-async-handler'
// import User from '../models/User.js'
// import Note from '../models/Note.js'

// // @desc Get all users
// // @route GET /api/admin/users
// // @access Admin
// export const getAllUsers = asyncHandler(async (req, res) => {
//   const users = await User.find().select('-password')
//   res.json(users)
// })

// // @desc Get all notes
// // @route GET /api/admin/notes
// // @access Admin
// export const getAllNotes = asyncHandler(async (req, res) => {
//   const notes = await Note.find().populate('user', 'email')
//   res.json(notes)
// })

// // @desc Delete a note (Admin)
// // @route DELETE /api/admin/notes/:id
// // @access Admin
// export const deleteNoteByAdmin = asyncHandler(async (req, res) => {
//   const note = await Note.findById(req.params.id)
//   if (!note) {
//     res.status(404)
//     throw new Error('Note not found')
//   }
//   await note.remove()
//   res.json({ message: 'Note removed by admin' })
// })

import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import Note from '../models/Note.js';

// @desc Get all users
// @route GET /api/admin/users
// @access Private/Admin
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).select('-password'); // don’t expose passwords
  res.json(users);
});

// @desc Get all notes
// @route GET /api/admin/notes
// @access Private/Admin
const getAllNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find({}).populate('user', 'email');
  res.json(notes);
});

// @desc Delete note by admin
// @route DELETE /api/admin/notes/:id
// @access Private/Admin
const deleteNoteByAdmin = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (!note) {
    res.status(404);
    throw new Error('Note not found');
  }

  await note.deleteOne();
  res.json({ message: 'Note removed by admin' });
});

export { getAllUsers, getAllNotes, deleteNoteByAdmin };
