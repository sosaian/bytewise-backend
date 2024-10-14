import User from '../models/User.js'
import bcrypt from 'bcrypt'
import { SALT_ROUNDS } from '../../config.js'

export class UserController {
    static async update(req, res) {
        const { name, email, password } = req.body
        const { id: USER_ID } = req.user
        const data = {}
    
        try {
            //  This could be improved applying dependency injection...
            UserValidation.email(email)         // Validating the username.
            UserValidation.password(password)   // Validating the password.

            const hashedPassword = await bcrypt.hashSync(password, SALT_ROUNDS)

            if (name) data.name_user = name
            if (email) data.email = email
            if (password) data.password_user = hashedPassword

            await User.updateUser(USER_ID, data)

            res.clearCookie('access_token')
               .json({ message: 'User updated successfully. Please login again.' })
        } catch (error) {
            res.status(500).json({ error: 'Error updating user' })
        }
    }
    
    static async delete(req, res) {
        const { id: USER_ID } = req.user

        try {
            await User.deleteUserDependencies(USER_ID)
            
            await User.deleteUser(USER_ID)

            res.clearCookie('access_token')
               .json({ message: 'The user was deleted successfully. You will now be logged out.' })
        } catch (error) {
            res.status(500).json({ error: 'Error deleting user' })
        }
    }
}

export class UserValidation {
    // NOTE: Error handling could be improved... https://youtu.be/OhE-mEt37iA
    //       Also... this could be done simpler with 'zod'
    
    static email (email) {
        if (typeof email !== 'string') throw new Error('Email must be a string')
        
        /*
            It is important to note that it does not cover all possible and specific
            cases defined by email standards (RFC 5322), but it is suitable for most
            common purposes.
        */

        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        
        /* 
            Breakdown of the Regular Expression
                ^: Start of the line.
                [^\s@]+: One or more characters that are neither whitespace nor '@'.
                @: Exactly one '@' symbol.
                [^\s@]+: One or more characters that are neither whitespace nor '@'.
                \.: Exactly one '.' (dot).
                [^\s@]+: One or more characters that are neither whitespace nor '@'.
                $: End of the line.
        */
            
        const emailIsValid = regex.test(email)

        if (!emailIsValid) throw new Error('Email must be a valid email address')
    }

    static password (password) {
        // Validating the password.
        if (typeof password !== 'string') throw new Error('Password must be a string')
        if (password.length < 6) throw new Error('Password must be at least 6 characters long')
    }
}
