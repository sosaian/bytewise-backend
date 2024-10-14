import express from "express"
import authMiddleware  from '../middleware/authMiddleware.js'
import { TaskController } from '../controller/taskController.js'

const router = express.Router()

router.get('/api/task/user', authMiddleware, TaskController.getAll)

router.post('/api/task', authMiddleware, TaskController.create)
router.get('/api/task/:id', authMiddleware, TaskController.get)
router.put('/api/task/:id', authMiddleware, TaskController.update)
router.delete('/api/task/:id', authMiddleware, TaskController.delete)


export default router