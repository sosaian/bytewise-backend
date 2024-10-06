import express from 'express'
import { AuthController } from '../controller/authController.js'

const router = express.Router()

router.post('/auth/register', AuthController.register)
router.post('/auth/login', AuthController.login)
router.post('/auth/logout', AuthController.logout)

export default router