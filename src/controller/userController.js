import User from '../models/User.js'

export class UserController {    
    static async get(req, res) {
        const { id } = req.params
        const { id: USER_ID } = req.user

        try {
            await UserAuth.verifyUserOwnership(id, USER_ID)
            
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
        const { id: USER_ID } = req.user
        const data = {}
    
        try {
            await UserAuth.verifyUserOwnership(id, USER_ID)

            if (name_user) data.name_user = name_user
            if (email) data.email = email
            if (password_user) data.password_user = password_user

            await User.updateUser(id, data)

            res.json({ message: 'User updated successfully' })
        } catch (error) {
            res.status(500).json({ error: 'Error updating user' })
        }
    }
    
    static async delete(req, res) {
        const { id } = req.params
        const { id: USER_ID } = req.user

        try {
            await UserAuth.verifyUserOwnership(id, USER_ID)

            await User.deleteUser(id)

            res.json({ message: 'User deleted successfully' })
        } catch (error) {
            res.status(500).json({ error: 'Error deleting user' })
        }
    }
}

export class UserAuth {
    static async verifyUserOwnership(target_id, USER_ID) {
        const TARGETED_USER = await Task.getUserById(target_id)
            
        if (!TARGETED_USER) throw new Error('User not found')

        if (target_id !== USER_ID) throw new Error('Invalid user ID')
    }
}
