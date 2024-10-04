import app from './src/app.js'
import dotenv from 'dotenv'
import mysql from 'mysql2'
dotenv.config()


const PORT = process.env.NODE_SERVER_PORT || 3000

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})

