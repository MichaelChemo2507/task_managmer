const connection = require('../db/db_config');

class TasksRepository {
    static async getTotalPages(values) {
        const sql = 'SELECT COUNT(id) AS cnt FROM `categories` WHERE `user_id` = ?';
        const [res, fields] = await connection.pool.execute(sql, values);
        return res;
    }
    static async getAll() {
        const sql = 'SELECT * FROM `tasks`';

        const [rows, fields] = await connection.pool.query({
            sql,
        });

        return rows;

    }
    static async getAllByUserId(values) {
        console.log(values);
        let sql = 'SELECT `id`,`category_name` FROM `categories` WHERE `user_id` = ?';
        
        if (values.length > 1)
            sql += '  LIMIT ?, ?'
        
        const [rows, fields] = await connection.pool.execute(sql, values);

        return rows;
    }
    static async addCategory(values) {
        const sql = 'INSERT INTO `categories`(`category_name`,`user_id`) VALUES(?,?)';
        const [rows, fields] = await connection.pool.execute(sql, values);
        return rows;
    }
    static async deleteCategory(values) {
        const sql = 'DELETE FROM `categories` WHERE `id` = ?';
        const [rows, fields] = await connection.pool.execute(sql, values);
        return rows;
    }
    static async updateCategory(values) {
        const sql =
            'UPDATE `categories` SET `category_name` = ? WHERE `id` = ?';
        const [rows, fields] = await connection.pool.execute(sql, values);
        return rows;
    }
}

module.exports = TasksRepository;