import express from 'express'
import authMiddleware  from '../middleware/authMiddleware.js'
import { TransactionController } from '../controller/transactionController.js'

const router = express.Router()

router.post('/api/transaction', authMiddleware, TransactionController.create)
router.get('/api/transaction/:id', authMiddleware, TransactionController.get)
router.put('/api/transaction/:id', authMiddleware, TransactionController.update)
router.delete('/api/transaction/:id', authMiddleware, TransactionController.delete)

router.get('/api/budget-summary', authMiddleware, TransactionController.getBudgetSummary)

export default router