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
        const { userId, sortParameters, pageProperties } = values;
        let sql = 'SELECT `id`,`category_id`,`description`,`date`,`is_done` FROM `tasks` WHERE `user_id` = ?';
        let queryValues = [userId];
        if (sortParameters) {
            if (sortParameters.category > 0) {
                sql += ' AND `category_id` = ?';
                queryValues.push(sortParameters.category);
            } else if (sortParameters.category == 0) {
                sql += ' AND `category_id` = null';
            }

            if (sortParameters.isDone > 0 && sortParameters.isDone < 3) {
                sql += ' AND `is_done` = ?';
                queryValues.push(sortParameters.isDone);
            }
        }
        const [rows, fields] = await connection.pool.execute(sql, queryValues);

        return rows;
    }
    static async addTask(values) {
        const sql = 'INSERT INTO `tasks`(`user_id`, `category_id`, `description`, `date`, `is_done`) VALUES (?,?,?,?,?)';
        
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