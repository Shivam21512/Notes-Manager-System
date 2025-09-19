import asyncHandler from 'express-async-handler';
import Note from '../models/Note.js';

// @desc Get all notes for a user
// @route GET /api/notes
// @access Private
const getNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(notes);
});

// @desc Create new note
// @route POST /api/notes
// @access Private
const createNote = asyncHandler(async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    res.status(400);
    throw new Error('Please add all fields');
  }

  const note = await Note.create({
    user: req.user._id,
    title,
    content,
  });

  res.status(201).json(note);
});

// @desc Update a note
// @route PUT /api/notes/:id
// @access Private
const updateNote = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (!note) {
    res.status(404);
    throw new Error('Note not found');
  }

  if (note.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('Not authorized');
  }

  note.title = req.body.title ?? note.title;
  note.content = req.body.content ?? note.content;

  const updatedNote = await note.save();
  res.json(updatedNote);
});

// @desc Delete note
// @route DELETE /api/notes/:id
// @access Private
const deleteNote = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (!note) {
    res.status(404);
    throw new Error('Note not found');
  }

  if (note.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('Not authorized');
  }

  await note.deleteOne();
  res.json({ message: 'Note removed' });
});

export { getNotes, createNote, updateNote, deleteNote };
