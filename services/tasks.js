const TasksRepository = require('../repositories/tasks');
const DetailedError = require('../utils/errors/detailedError');
const TasksValidation = require('../utils/validation/tasks')

class TasksService {

    static async getTotalPages(id) {
        if (!id || id === null || id <= 0)
            throw new DetailedError('Invalid id', 'categories', STATUS_CODES.INTERNAL_SERVER);

        let rows = await CategoriesRepository.getTotalPages([id]);

        if (rows.length === 0 || rows.cnt <= 0)
            throw new DetailedError('No result from db', 'categories', STATUS_CODES.INTERNAL_SERVER);
        return rows[0].cnt;
    }
    static async getAll() {
        let rows = await TasksRepository.getAll();

        let validation = new TasksValidation(rows);
        validation.res_validate();

        return rows;
    }
    static async getAllByUserId(id, sortParameters, pageParameters) {
        const { page, rowsPerPage } = pageParameters;

        if (!id || id === null || id < 0)
            throw new DetailedError("Invalid id", 'tasks', STATUS_CODES.BED_REQUEST);

        
        let rows;

        if (pageParameters)
            rows = await TasksRepository.getAllByUserId({ userId: Number(id), sortParameters: sortParameters, pageParameters: [page * rowsPerPage, rowsPerPage] });
        else
            rows = await TasksRepository.getAllByUserId({ userId: Number(id), sortParameters: sortParameters });

        let validation = new TasksValidation(rows);
        validation.res_validate();

        return rows;
    }
    static async addCategory(values) {
        const { userId, categoryName } = values;

        let validation = new CategoriesValidation(values);
        validation.req_validate();

        let rows = await CategoriesRepository.addCategory([categoryName, userId]);

        if (rows.insertId === 0)
            throw new DetailedError("No category was added", 'categories', STATUS_CODES.INTERNAL_SERVER);

        return rows.insertId;
    }
    static async deleteCategory(id) {

        if (!id || id < 0)
            throw new DetailedError("Invalid id", 'users_service', STATUS_CODES.BED_REQUEST)

        let rows = await CategoriesRepository.deleteCategory([id]);

        if (!rows.affectedRows || rows.affectedRows < 0)
            throw new DetailedError("No category exist", 'categories', STATUS_CODES.BED_REQUEST)

        return rows.affectedRows;
    }
    static async updateCategory({ categoryName }, id) {
        if (!id || typeof id !== typeof 1 || id <= 0)
            throw new DetailedError("Invalid id", 'category', STATUS_CODES.BED_REQUEST)

        if (!categoryName || categoryName === null)
            throw new DetailedError("Invalid category name", 'category', STATUS_CODES.BED_REQUEST)

        let rows = await CategoriesRepository.updateCategory([String(categoryName).trim(), id]);

        if (!rows.affectedRows || rows.affectedRows < 0)
            throw new DetailedError("No category exist", 'category', STATUS_CODES.BED_REQUEST)

        return rows.affectedRows;
    }
}

module.exports = TasksService;