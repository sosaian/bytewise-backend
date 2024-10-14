import mysql from 'mysql2'
import { mysql_host, mysql_user, mysql_password, mysql_database } from '../../config.js'

// Crea la conexión 
const pool = mysql.createPool({
    host: mysql_host,
    user: mysql_user,
    password: mysql_password,
    database: mysql_database
}).promise()

// Manejo de la conexion / errores
try {
    await pool.getConnection() // Intenta obtener una conexión para verificar la configuración
    console.log('Conexión a la base de datos establecida correctamente.')
} catch (error) {
    console.error('Error conectando a la base de datos:', error)
    process.exit(1) // Salir si no se puede conectar
}


// Cerrar el pool al terminar la aplicación
process.on('SIGINT', async () => {
    await pool.end()
    console.log('Pool de conexiones cerrado.')
    process.exit(0)
})

export default pool
