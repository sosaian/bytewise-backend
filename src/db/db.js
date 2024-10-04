import dotenv from 'dotenv'
import mysql from 'mysql2'
dotenv.config()

// Crea la conexión 
const pool = mysql.createPool({
    host: process.env.mysql_host,
    user: process.env.mysql_user,
    password: process.env.mysql_password,
    database: process.env.mysql_database
}).promise()

// Manejo de la conexion / errores
try {
    await pool.getConnection(); // Intenta obtener una conexión para verificar la configuración
    console.log('Conexión a la base de datos establecida correctamente.');
} catch (error) {
    console.error('Error conectando a la base de datos:', error);
    process.exit(1); // Salir si no se puede conectar
}

// Hacer que el pool de conexiones esté disponible en la aplicación
app.set('db', pool);


// Cerrar el pool al terminar la aplicación
process.on('SIGINT', async () => {
    await pool.end();
    console.log('Pool de conexiones cerrado.');
    process.exit(0);
});