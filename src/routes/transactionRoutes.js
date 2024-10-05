import express from 'express'
import TransactionController from '../controller/transactionController.js'

const router = express.Router()

router.post('/api/users', TransactionController.create);
router.get('/api/users/:id', TransactionController.get);
router.put('/api/users/:id', TransactionController.update);
router.delete('/api/users/:id', TransactionController.delete);

export default router;