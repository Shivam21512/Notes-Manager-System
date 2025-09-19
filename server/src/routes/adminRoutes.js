// import express from 'express'
// import { getAllUsers, getAllNotes } from '../controllers/adminController.js'

// const router = express.Router()

// router.get('/users', getAllUsers)      // <-- error likely here
// router.get('/notes', getAllNotes)      // <-- or here

// export default router

// import express from 'express'
// import { protect, admin } from '../middleware/authMiddleware.js'
// import { getAllUsers, getAllNotes, deleteNoteByAdmin } from '../controllers/adminController.js'

// const router = express.Router()

// // Admin-only routes
// router.get('/users', protect, admin, getAllUsers)          // List all users
// router.get('/notes', protect, admin, getAllNotes)          // List all notes
// router.delete('/notes/:id', protect, admin, deleteNoteByAdmin) // Delete note by admin

// export default router


import express from 'express';
import { protect, admin } from '../middleware/authMiddleware.js';
import { getAllUsers, getAllNotes, deleteNoteByAdmin } from '../controllers/adminController.js';

const router = express.Router();

router.get('/users', protect, admin, getAllUsers);
router.get('/notes', protect, admin, getAllNotes);
router.delete('/notes/:id', protect, admin, deleteNoteByAdmin);

export default router;
