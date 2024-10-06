import express from 'express'
import authMiddleware  from '../middleware/authMiddleware.js'
import UserController from '../controller/userController.js'

const router = express.Router()

router.post('/api/users', authMiddleware, UserController.create)
router.get('/api/users/:id', authMiddleware, UserController.get)
router.put('/api/users/:id', authMiddleware, UserController.update)
router.delete('/api/users/:id', authMiddleware, UserController.delete)

export default router