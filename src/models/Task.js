import pool from '../db.js';

class Task {
    static async createTask(id_user, description_task, status_task, due_date) {
        const [result] = await pool.query(
            'INSERT INTO task (id_user, description_task, status_task, due_date) VALUES (?, ?, ?, ?)',
            [id_user, description_task, status_task, due_date]
        );
        return result.insertId;
    }

    static async getTaskById(id) {
        const [rows] = await pool.query('SELECT * FROM task WHERE id = ?', [id]);
        return rows[0];
    }

    static async updateTask(id, description_task, status_task, due_date) {
        await pool.query(
            'UPDATE task SET description_task = ?, status_task = ?, due_date = ? WHERE id = ?',
            [description_task, status_task, due_date, id]
        );
    }

    static async deleteTask(id) {
        await pool.query('DELETE FROM task WHERE id = ?', [id]);
    }
}

export default Task;
