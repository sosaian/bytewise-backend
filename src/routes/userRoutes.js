import express from 'express'
import authMiddleware  from '../middleware/authMiddleware.js'
import { UserController } from '../controller/userController.js'

const router = express.Router()

router.put('/api/users', authMiddleware, UserController.update)
router.delete('/api/users', authMiddleware, UserController.delete)

export default router