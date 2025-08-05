const connection = require('../db/db_config');

class CategoriesRepository {
    static async getAll() {
        const sql = 'SELECT * FROM `categories`';
        const [rows, fields] = await connection.pool.query({
            sql,
        });
        return rows;
    } static async getAllByUserId(values) {
        const sql = 'SELECT `id`,`category_name` FROM `categories` WHERE `user_id` = ?';
        const [rows, fields] = await connection.pool.execute(sql, values);
        return rows;
    }
    static async addCategory(values) {
        console.log(values);
        const sql = 'INSERT INTO `categories`(`category_name`,`user_id`) VALUES(?,?)';
        const [rows, fields] = await connection.pool.execute(sql, values);
        return rows;
    }
}

module.exports = CategoriesRepository;