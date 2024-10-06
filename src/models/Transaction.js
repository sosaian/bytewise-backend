import pool from '../db/db.js';


class Transaction{
    static async createTransaction(id_user, type_transaction, amount){
        // Verifico si existe el usuario
        const [userRows] = await pool.query('SELECT * FROM user WHERE id = ?', [id_user]);
        if (userRows.length === 0) {
            throw new Error('El usuario no existe');
        }
        
        // Creo una transaccion si el usuario existe
        const [result] = await pool.query(
            'INSERT INTO transaction (id_user, type_transaction, amount) VALUES (?, ?, ?, ?)',
            [id_user, type_transaction, amount, new Date()]
        );

        return result.insertId;
    }


    static async getTransactionById(id){
        const [rows] = await pool.query(
            'select * from transaction where id = ?', [id]);
        return rows[0];
    }

    static async deleteTransaction(id){
        await pool.query('delete from transaction where id = ?', [id]);
    }

    static async updateTransaction(id, data) {
        let query = 'UPDATE transaction SET';
        const params = [];
    
        // Construir dinámicamente la consulta solo con los campos proporcionados
        if (data.type_transaction) {
            query += ' type_transaction = ?,';
            params.push(data.type_transaction);
        }
        if (data.amount) {
            query += ' amount = ?,';
            params.push(data.amount);
        }
        if (data.date_transaction) {
            query += ' date_transaction = ?,';
            params.push(data.date_transaction);
        }
    
        // Eliminar la última coma y añadir la condición WHERE
        query = query.slice(0, -1) + ' WHERE id = ?';
        params.push(id);
    
        // Ejecutar la consulta con los parámetros
        await pool.query(query, params);
    }

    //Reemplaza totalmente a la entidad BUDGET. 
    //** Este metodo se encarga de darte un resumen completo del presupuesto, tanto gastos, como ingresos y ahorros.*/
    static async getBudgetSummary(id_user){
        const [results] = await pool.query(
            `SELECT 
                SUM(CASE WHEN type_transaction = 'income' THEN amount ELSE 0 END) AS total_income,
                SUM(CASE WHEN type_transaction = 'expense' THEN amount ELSE 0 END) AS total_expense,
                SUM(CASE WHEN type_transaction = 'save' THEN amount ELSE 0 END) AS total_savings
            FROM transaction 
            WHERE id_user = ?`,
            [id_user]
        );
        return results[0];
    }

}

export default Transaction;
