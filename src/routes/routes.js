import express from 'express'
import UserController from '../controller/userController.js'

const router = express.Router()

// Ruta de prueba
router.get('/api', (req, res) => {
    return res.json("Hello World!")
})

//Rutas para User
router.post('/api/users', UserController.create);
router.get('/api/users/:id', UserController.get);
router.put('/api/users/:id', UserController.update);
router.delete('/api/users/:id', UserController.delete);


//Rutas para Transaction
// ...



export default router