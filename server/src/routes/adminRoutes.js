// backend/src/routes/adminRoutes.js
import express from 'express'
import { protect, admin } from '../middleware/authMiddleware.js'
import { listUsers, listAllNotes } from '../controllers/adminController.js'

const router = express.Router()

router.get('/users', protect, admin, listUsers)
router.get('/notes', protect, admin, listAllNotes)

export default router
