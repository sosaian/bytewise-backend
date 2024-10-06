import jwt from 'jsonwebtoken'
import { SECRET_JWT_KEY } from '../../config.js'

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization']

    if (!token) {
        return res.status(401).json({ message: 'Access denied, no token provided' })
    }

    try {
        const decoded = jwt.verify(token, SECRET_JWT_KEY)
        req.user = decoded
        next(); // Proceed to the next middleware or route handler
    } catch (err) {
        return res.status(400).json({ message: 'Invalid token' })
    }
}

export default authMiddleware
