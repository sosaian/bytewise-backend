//Se importa ya que pool es un objeto que permite realizar consultas a la base de datos
import pool from '../db/db.js'

class User{

    static async createUser(name_user, email, password_user){
        //Realizo consulta a la base de datos utilizando el metodo query, 
        //dicha consulta se almacena en result.
        const [result] = await pool.query(
            'insert into user (name_user, email, password_user) values (?,?,?)',
            [name_user, email, password_user]
        )
        //Devuelve id del nuevo usuario creado.
        return result.insertId
    }


    static async getUserById(id){
        const [rows] = await pool.query (
            'select * from user where id = ?',
            [id])

        return rows[0]
    }

    static async getUserByEmail(email){
        const [rows] = await pool.query (
            'select * from user where email = ?',
            [email])

        return rows[0]
    }

    static async updateUser(id, data) {
        let query = 'UPDATE user SET'
        const params = []
    
        // Construir dinámicamente la consulta solo con los campos proporcionados
        if (data.name_user) {
            query += ' name_user = ?,'
            params.push(data.name_user)
        }
        if (data.email) {
            query += ' email = ?,'
            params.push(data.email)
        }
        if (data.password_user) {
            query += ' password_user = ?,'
            params.push(data.password_user)
        }
    
        // Eliminar la última coma y añadir la condición WHERE
        query = query.slice(0, -1) + ' WHERE id = ?'
        params.push(id)
    
        // Ejecutar la consulta con los parámetros
        await pool.query(query, params)
    }
    

   
    static async deleteUser(id) {
        await pool.query('DELETE FROM user WHERE id = ?', [id])
    }
}

export default User
