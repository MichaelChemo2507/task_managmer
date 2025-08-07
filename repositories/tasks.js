const connection = require('../db/db_config');

class TasksRepository {
    static async getTotalPages(values) {
        const sql = 'SELECT COUNT(id) AS cnt FROM `tasks` WHERE `user_id` = ?';
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
        const { userId, pageProperties, sortParameters } = values;

        let sql = 'SELECT `id`,`category_id`,`description`,`date`,`is_done` FROM `tasks` WHERE `user_id` = ?';

        let queryValues = [userId];

        if (sortParameters) {
            
            if (Number(sortParameters.category) > 0) {
                console.log(sortParameters.category);
                
                sql += ' AND `category_id` = ?';
                queryValues.push(sortParameters.category);
                
            } else if (Number(sortParameters.category) === -1) {
                console.log(sortParameters.category);
                sql += ' AND `category_id` IS NULL';
            }
            
            if (Number(sortParameters.isDone) > 0 && Number(sortParameters.isDone) < 3) {
                console.log(sortParameters.isDone);

                sql += ' AND `is_done` = ?';
                queryValues.push(sortParameters.isDone);

            }

            if (pageProperties) {

                sql += ' LIMIT ?, ?';
                queryValues.push(...pageProperties);

            }
        }

        console.log(queryValues);
        console.log(sql);

        const [rows, fields] = await connection.pool.execute(sql, queryValues);

        return rows;
    }
    static async addTask(values) {
        const sql = 'INSERT INTO `tasks`(`user_id`, `category_id`, `description`, `date`, `is_done`) VALUES (?,?,?,?,?)';

        const [rows, fields] = await connection.pool.execute(sql, values);

        return rows;
    }
    static async deleteTask(values) {
        const sql = 'DELETE FROM `tasks` WHERE `id` = ?';

        const [rows, fields] = await connection.pool.execute(sql, values);

        return rows;
    }
    static async updateTask(values) {
        console.log(values);

        const sql = 'UPDATE `tasks` SET `category_id` = ?, `description` = ?, `date` = ?, `is_done` = ? WHERE `id` = ?';

        const [rows, fields] = await connection.pool.execute(sql, values);

        return rows;
    }
}

module.exports = TasksRepository;