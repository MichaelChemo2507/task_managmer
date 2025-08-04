const connection = require('../db/db_config');

class CategoriesRepository {
    static async getAll() {
        const sql = 'SELECT * FROM `categories`';
        const [rows, fields] = await connection.pool.query({
            sql,
        });
        return rows;
    }
}

module.exports = CategoriesRepository;