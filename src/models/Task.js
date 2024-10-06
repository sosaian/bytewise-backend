import pool from '../db/db.js'

class Task {
    static async createTask(id_user, description_task, status_task, due_date) {
        const [result] = await pool.query(
            'INSERT INTO task (id_user, description_task, status_task, due_date) VALUES (?, ?, ?, ?)',
            [id_user, description_task, status_task, due_date]
        )
        return result.insertId
    }

    static async getTaskById(id) {
        const [rows] = await pool.query('SELECT * FROM task WHERE id = ?', [id])
        return rows[0]
    }

    static async updateTask(id, data) {
        let query = `UPDATE task SET`
        const params = []

        if (data.description_task) {
            query += ' description_task = ?,'
            params.push(data.description_task)
        }

        if (data.status_task) {
            query += ' status_task = ?,'
            params.push(data.status_task)
        }

        if (data.due_date) {
            query += ' due_date = ?,'
            params.push(data.due_date)
        }
        
        query = query.slice(0, -1) + ' WHERE id = ?'
        params.push(id)

        await pool.query(query, params)
    }

    static async deleteTask(id) {
        await pool.query('DELETE FROM task WHERE id = ?', [id])
    }
}

export default Task
