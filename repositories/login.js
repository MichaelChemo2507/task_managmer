const connection = require('../db/db_config');

class Users {
    static async authorizationProcess(values) {
        values = !Array.isArray(values) ? [values] : values;
        
        const sql = 'SELECT * FROM `users` WHERE `password` = ? AND `email` = ?';
        const [rows, fields] = await connection.pool.execute(sql, values);
        return rows;
    }
}
module.exports = Users;
