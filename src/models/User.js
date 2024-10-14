// Imported because 'pool' is an object that allows executing database queries
import pool from '../db/db.js'

class User{
    static async createUser(name_user, email, password_user) {
        // Perform a database query using the query method,
        // and store the result in the 'result' variable.
        const [result] = await pool.query(
            'INSERT INTO user (name_user, email, password_user) VALUES (?,?,?)',
            [name_user, email, password_user]
        )
        // Return the ID of the newly created user.
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

        // Dynamically build the query using only the provided fields
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

        // Remove the trailing comma and add the WHERE clause
        query = query.slice(0, -1) + ' WHERE id = ?'
        params.push(id)

        // Execute the query with the parameters
        await pool.query(query, params)
    }

    // Centralized in User model per "Fat Model, Skinny Controller" principle
    static async deleteUserDependencies(id) {
        // Start a transaction to ensure that all deletions occur atomically
        await pool.query('START TRANSACTION')
    
        try {
            // Delete the user's transactions
            await pool.query('DELETE FROM transactions WHERE id_user = ?', [id])
    
            // Delete the user's tasks
            await pool.query('DELETE FROM task WHERE id_user = ?', [id])

            // Commit the transaction
            await pool.query('COMMIT')
        } catch (error) {
            // If an error occurs, roll back all changes
            await pool.query('ROLLBACK')
            throw error
        }
    }
   
    static async deleteUser(id) {
        await pool.query('DELETE FROM user WHERE id = ?', [id])
    }
}

export default User
