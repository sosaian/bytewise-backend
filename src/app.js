import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
import transactionRoutes from './routes/transactionRoutes.js'
import taskRoutes from './routes/taskRoutes.js'
import pool from './db/db.js'

const app = express()

app.use(cors())

app.use(express.json())

app.use(cookieParser())

app.use(authRoutes)

app.use(userRoutes)

app.use(transactionRoutes)

app.use(taskRoutes)

app.set('db', pool)

export default app
