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
}

module.exports = CategoriesRepository;