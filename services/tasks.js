const TasksRepository = require('../repositories/tasks');
const DetailedError = require('../utils/errors/detailedError');
const TasksValidation = require('../utils/validation/tasks');
const correctDateFormat = require('../utils/correctDateFormat');

class TasksService {

    static async getTotalPages(id) {
        if (!id || id === null || id <= 0)
            throw new DetailedError('Invalid id', 'tasks', STATUS_CODES.INTERNAL_SERVER);

        let rows = await TasksRepository.getTotalPages([id]);

        if (rows.length === 0 || rows.cnt <= 0)
            throw new DetailedError('No result from db', 'tasks', STATUS_CODES.INTERNAL_SERVER);
        return rows[0].cnt;
    }
    static async getAll() {
        let rows = await TasksRepository.getAll();

        let validation = new TasksValidation(rows);
        validation.res_validate();

        rows = rows.map(row => {
            row.date = correctDateFormat(row.date);
            if (row.description === null) row.description = "";
            if (row.category_id === null) row.category_id = 0;
            return row;
        })


        return rows;
    }
    static async getAllByUserId(id, pageParameters, sortParameters) {

        if (!id || id === null || id <= 0)
            throw new DetailedError("Invalid id", 'tasks', STATUS_CODES.BED_REQUEST);


        let rows;

        if (pageParameters) {
            const { page, rowsPerPage } = pageParameters;

            if (sortParameters) {

                let validation = new TasksValidation(sortParameters);
                validation.sort_parameters_validation({ id, ...sortParameters });

                rows = await TasksRepository.getAllByUserId({ userId: Number(id), pageParameters: [page * rowsPerPage, rowsPerPage], sortParameters: sortParameters });

            } else {

                rows = await TasksRepository.getAllByUserId({ userId: Number(id), pageParameters: [page * rowsPerPage, rowsPerPage] });

            }
        } else if (sortParameters) {

            let validation = new TasksValidation(sortParameters);
            validation.sort_parameters_validation({ id, ...sortParameters });

            rows = await TasksRepository.getAllByUserId({ userId: Number(id), sortParameters: sortParameters });

        } else {

            rows = await TasksRepository.getAllByUserId({ userId: Number(id) });

        }

        let validation = new TasksValidation(rows);
        validation.res_validate();

        rows = rows.map(row => {
            row.date = correctDateFormat(row.date);
            if (row.description === null) row.description = "";
            if (row.category_id === null) row.category_id = 0;
            return row;
        })

        return rows;
    }
    static async addTask(values) {

        let validation = new TasksValidation(values);
        validation.req_validate();

        let { userId, description, category, date } = values;

        if (Number(category) === 0)
            category = null;

        let rows = await TasksRepository.addTask([Number(userId), category, String(description), correctDateFormat(date), 2]);

        if (rows.insertId === 0)
            throw new DetailedError("No Task was added", 'task', STATUS_CODES.INTERNAL_SERVER);

        return rows.insertId;
    }
    static async deleteTask(id) {

        if (!id || id <= 0)
            throw new DetailedError("Invalid id", 'task', STATUS_CODES.BED_REQUEST)

        let rows = await TasksRepository.deleteTask([id]);

        if (!rows.affectedRows || rows.affectedRows <= 0)
            throw new DetailedError("No task exist", 'task', STATUS_CODES.BED_REQUEST)

        return rows.affectedRows;
    }
    static async updateTask(values, id) {
        if (!id || typeof id !== typeof 1 || id <= 0)
            throw new DetailedError("Invalid id", 'category', STATUS_CODES.BED_REQUEST)

        let validation = new TasksValidation(values);
        validation.req_validate();

        let { description, category, date, isDone } = values;

        if (Number(category) === 0)
            category = null;

        let rows = await TasksRepository.updateTask([category, String(description), correctDateFormat(date), Number(isDone), id]);

        if (rows.affectedRows === 0)
            throw new DetailedError("No Task was updated", 'task', STATUS_CODES.INTERNAL_SERVER);

        return rows.insertId;
    }
}

module.exports = TasksService;