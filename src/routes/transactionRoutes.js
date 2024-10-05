import express from 'express'
import TransactionController from '../controller/transactionController.js'

const router = express.Router()

router.post('/api/transaction', TransactionController.create);
router.get('/api/transaction/:id', TransactionController.get);
router.put('/api/transaction/:id', TransactionController.update);
router.delete('/api/transaction/:id', TransactionController.delete);
router.get('/budget-summary/:id_user', TransactionController.getBudgetSummary);

export default router;