const asyncHandler = require('express-async-handler');
const Note = require('../models/Note');

// @desc    Create a new note
// @route   POST /api/notes
// @access  Private
const createNote = asyncHandler(async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    res.status(400);
    throw new Error('Title and description are required');
  }

  const note = await Note.create({
    title: title.trim(),
    description: description.trim(),
    user: req.user._id,
  });

  res.status(201).json(note);
});

// @desc    Get all notes for logged-in user
// @route   GET /api/notes
// @access  Private
const getNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(notes);
});

// @desc    Update a note
// @route   PUT /api/notes/:id
// @access  Private
const updateNote = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (!note) {
    res.status(404);
    throw new Error('Note not found');
  }

  // Only owner can update
  if (note.user.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Not authorized to update this note');
  }

  note.title = req.body.title?.trim() ?? note.title;
  note.description = req.body.description?.trim() ?? note.description;

  const updatedNote = await note.save();
  res.json(updatedNote);
});

// @desc    Delete a note
// @route   DELETE /api/notes/:id
// @access  Private
const deleteNote = asyncHandler(async (req, res) => {
  try {
    if (!req.user) {
      res.status(401);
      throw new Error('Not authorized, no user info');
    }

    const note = await Note.findById(req.params.id);
    if (!note) {
      res.status(404);
      throw new Error('Note not found');
    }

    // Only the owner or admin can delete
    if (note.user.toString() !== req.user._id.toString() && !req.user.isAdmin) {
      res.status(403);
      throw new Error('Not authorized to delete this note');
    }

    await note.deleteOne(); // safer than remove()
    res.status(200).json({ message: 'Note deleted successfully' });
  } catch (err) {
    console.error('Error deleting note:', err);
    res.status(500).json({ message: 'Server error while deleting note' });
  }
});


module.exports = { createNote, getNotes, updateNote, deleteNote };
