import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import userRoutes from './routes/userRoutes.js'
import transactionRoutes from './routes/transactionRoutes.js'
import taskRoutes from './routes/taskRoutes.js'

const app = express()

app.use(cors())

app.use(express.json())

app.use(cookieParser())

app.use(userRoutes)

app.use(transactionRoutes)

app.use(taskRoutes)

export default app