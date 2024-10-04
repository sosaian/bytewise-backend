import User from '../models/User.js';

//Clase que hace como intermediaria entre rutas(routes.js)
// y logica de aplicacion con consultas a bdd (User.js)


class UserController {
    static async create(req, res) {
        const { name, email, password } = req.body;
        try {
            const userId = await User.createUser(name, email, password);
            res.status(201).json({ id: userId });
        } catch (error) {
            res.status(500).json({ error: 'Error creating user' });
        }
    }

    static async get(req, res) {
        const { id } = req.params;
        try {
            const user = await User.getUserById(id);
            if (user) {
                res.json(user);
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Error fetching user' });
        }
    }

    static async update(req, res) {
        const { id } = req.params;
        const { name, email, password } = req.body;
        try {
            await User.updateUser(id, name, email, password);
            res.json({ message: 'User updated successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Error updating user' });
        }
    }

    static async delete(req, res) {
        const { id } = req.params;
        try {
            await User.deleteUser(id);
            res.json({ message: 'User deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Error deleting user' });
        }
    }
}

export default UserController;
