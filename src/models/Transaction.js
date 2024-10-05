import pool from '../db/db.js';


class Transaction{
    static async createTransaction(id_user, type_transaction, amount, date_transaction){
        // Verifico si existe el usuario
        const [userRows] = await pool.query('SELECT * FROM user WHERE id = ?', [id_user]);
        if (userRows.length === 0) {
            throw new Error('El usuario no existe');
        }
        
        // Creo una transaccion si el usuario existe
        const [result] = await pool.query(
            'INSERT INTO transaction (id_user, type_transaction, amount, date_transaction) VALUES (?, ?, ?, ?)',
            [id_user, type_transaction, amount, date_transaction]
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

    static async deleteTransaction(id, type_transaction, amount, date_transaction){
        await pool.query('update transaction set type_transaction = ?, amount = ?, date_transaction = ? where id = ?',
            [type_transaction, amount, date_transaction, id]);
    }

}

export default Transaction;
