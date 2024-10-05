import express from 'express'
import UserController from '../controller/userController.js'

const router = express.Router()

router.post('/api/users', UserController.create);
router.get('/api/users/:id', UserController.get);
router.put('/api/users/:id', UserController.update);
router.delete('/api/users/:id', UserController.delete);

export default router;