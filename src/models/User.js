//Se importa ya que pool es un objeto que permite realizar consultas a la base de datos
import pool from '../db/db.js';



class User{

    static async createUser(name, email, password){
        //Realizo consulta a la base de datos utilizando el metodo query, 
        //dicha consulta se almacena en result.
        const [result] = await pool.query(
            'insert into user (name_user, email, password_user) values (?,?,?)',
            [name, email, password]
        );
        //Devuelve id del nuevo usuario creado.
        return result.insertId;
    }


    static async getUserById(id){
        const [rows] = await pool.query (
            'select * from user where id = ?',
            [id]);

        return rows[0];
    }

    static async updateUser(id, name, email, password) {
        await pool.query(
            'UPDATE user SET name_user = ?, email = ?, password_user = ? WHERE id = ?',
            [name, email, password, id]
        );
    }

   
    static async deleteUser(id) {
        await pool.query('DELETE FROM user WHERE id = ?', [id]);
    }
}

export default User;

