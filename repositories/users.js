const connection = require('../db/db_config');

class Users {
    static async authorizationProcess(values) {
        const sql = 'SELECT * FROM `users` WHERE `password` = ? AND `user_name` = ?';
        const [rows, fields] = await connection.pool.execute(sql, values);
        return rows;
    }
    static async getAll() {
        const sql = 'SELECT * FROM `users` ';
        const [rows, fields] = await connection.pool.query({
            sql,
        });
        return rows;
    }
    static async addUser(values) {
        const sql =
            'INSERT INTO `users`(`user_name`,`email`,`password`) VALUES (?,?,?)';
        const [rows, fields] = await connection.pool.execute(sql, values);
        return rows;
    }
    static async deleteUser(values) {
        const sql = 'DELETE FROM `users` WHERE `id` = ?';
        const [rows, fields] = await connection.pool.execute(sql, values);
        return rows;
    }
    static async updateUser(values) {
        const sql =
            'UPDATE `users` SET `user_name` = ?,`email` = ?,`password` = ? WHERE `ID` = ?';
        const [rows, fields] = await connection.pool.execute(sql, values);
        return rows;
    }
}

module.exports = Users;
