const express = require('express');
const router = express.Router();
const {
  createNote,
  getNotes,
  updateNote,
  deleteNote,
} = require('../controllers/notesController');

const { protect } = require('../middleware/authMiddleware');

// All routes need authentication
router.route('/')
  .get(protect, getNotes)
  .post(protect, createNote);

router.route('/:id')
  .put(protect, updateNote)
  .delete(protect, deleteNote);

module.exports = router;
