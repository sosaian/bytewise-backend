import express from 'express'
import cors from 'cors'
import routes from './routes/routes.js'
import userRoutes from './routes/userRoutes.js'
import transactionRoutes from './routes/transactionRoutes.js'
import taskRoutes from './routes/taskRoutes.js'
const app = express()

app.use(cors())

app.use(express.json())

app.use('/', routes)

app.use(userRoutes)

app.use(transactionRoutes)

app.use(taskRoutes)

export default app