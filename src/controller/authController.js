import User from '../models/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { NODE_ENV, SALT_ROUNDS, SECRET_JWT_KEY } from '../../config.js'

export class AuthController {
    static async register(req, res) {
        const { name, email, password } = req.body

        //  This could be improved applying dependency injection...
        Validation.email(email)         // Validating the username.
        Validation.password(password)   // Validating the password.

        const hashedPassword = await bcrypt.hashSync(password, SALT_ROUNDS)

        try {
            const emailAlreadyExists = await User.getUserByEmail(email).length > 0
            if (emailAlreadyExists) throw new Error('Email already exists')
            
            const userId = await User.createUser(name, email, hashedPassword)
            
            res.status(201).json({ id: userId })
        } catch (error) {
            res.status(500).json({ error: 'Error creating user' })
        }
    }

    static async login(req, res) {
        const { email, password } = req.body

        try {
            Validation.email(email)         // Validating the username.
            Validation.password(password)   // Validating the password.
    
            const user = await User.getUserByEmail(email) // No need to bring all the user info here...
            if (user.length === 0) throw new Error('User does not exist')
            if (user.length > 1) throw new Error('Multiple users have this email')
    
            const isValid = await bcrypt.compare(password, user.password_user)
            if (!isValid) throw new Error('Password is invalid')
    
            const token = jwt.sign({ id: user.id }, SECRET_JWT_KEY, {
                expiresIn: '1h'
            })
    
            // TODO: Create implementation for refreshToken
            // const refreshToken = jwt.sign({ id: user._id, username: user.username }, SECRET_JWT_KEY, {
            //     expiresIn: '7d'
            // })
            
            res.cookie('access_token', token, {
                httpOnly: true,                                 // Only be modified from the server.
                secure: true,                                   // Cookie only can be accessed via HTTPS.
                sameSite: 'none',                               // Only be accessed from the same domain.
                maxAge: 1000 * 60 * 60,                         // Cookie has a validity time of 1 hour.
                path: '/'
            })
               .send({
                 'id': user.id,
                 'name': user.name_user, 
                 token 
                })
        } catch (error) {
            res.status(401).send(error.message)
        }
    }

    static async logout(req, res) {
        res.clearCookie('access_token', {
            httpOnly: true,                                 // Only be modified from the server.
            secure: true,                                   // Cookie only can be accessed via HTTPS.
            sameSite: 'none',                               // Only be accessed from the same domain.
            path: '/'
        })
        
        res.status(200).json({ message: 'Logout successful'})
    }
}

export class Validation {
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
