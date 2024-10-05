import express from 'express'
import UserController from '../controller/userController.js'

const router = express.Router()

// Ruta de prueba
router.get('/api', (req, res) => {
    return res.json("Hello World!")
})

//Rutas para User



//Rutas para Transaction
// ...



export default router