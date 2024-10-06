import User from '../models/User.js'

export class UserController {
   
    static async create(req, res) {
        console.log('Cuerpo de la solicitud:', req.body) 
        const { name_user, email, password_user } = req.body
        try {
            const userId = await User.createUser(name_user, email, password_user)
            res.status(201).json({ id: userId })
        } catch (error) {
            console.error('Error creando usuario:', error)
            res.status(500).json({ error: error.message || 'Error creando usuario' })
        }
    }
    
    static async get(req, res) {
        const { id } = req.params
        try {
            const user = await User.getUserById(id)
            if (user) {
                res.json(user)
            } else {
                res.status(404).json({ error: 'User not found' })
            }
        } catch (error) {
            res.status(500).json({ error: 'Error fetching user' })
        }
    }

    static async update(req, res) {
        const { id } = req.params
        const { name_user, email, password_user} = req.body
    
        // Crear un objeto con los campos opcionales que se quieren actualizar
        const data = {}
        if (name_user) data.name_user = name_user
        if (email) data.email = email
        if (password_user) data.password_user = password_user
    
        try {
            await User.updateUser(id, data)
            res.json({ message: 'User updated successfully' })
        } catch (error) {
            res.status(500).json({ error: 'Error updating user' })
        }
    }
    
    static async delete(req, res) {
        const { id } = req.params
        try {
            await User.deleteUser(id)
            res.json({ message: 'User deleted successfully' })
        } catch (error) {
            res.status(500).json({ error: 'Error deleting user' })
        }
    }
}
