const CategoriesRepository = require('../repositories/categories');
const UsersRepository = require('../repositories/users')
const DetailedError = require('../utils/errors/detailedError');
const CategoriesValidation = require('../utils/validation/categories')

class CategoriesService {

    static async getTotalPages(id) {
        if (!id || id === null || id <= 0)
            throw new DetailedError('Invalid id', 'categories', STATUS_CODES.INTERNAL_SERVER);

        let rows = await CategoriesRepository.getTotalPages([id]);

        if (rows.length === 0 || rows.cnt <= 0)
            throw new DetailedError('No result from db', 'categories', STATUS_CODES.INTERNAL_SERVER);
        return rows[0].cnt;
    }
    static async getAll() {
        let rows = await CategoriesRepository.getAll();

        let validation = new CategoriesValidation(rows);
        validation.res_validate();

        return rows;
    }
    static async getAllByUserId(id, pageParameters) {
        const { page, rowsPerPage } = pageParameters;

        if (!id || id === null || id < 0)
            throw new DetailedError("Invalid id", 'categories', STATUS_CODES.BED_REQUEST);

        let rows;

        if (pageParameters)
            rows = await CategoriesRepository.getAllByUserId([id, page * rowsPerPage, rowsPerPage]);
        else 
            rows = await CategoriesRepository.getAllByUserId([id]);
        
        let validation = new CategoriesValidation(rows);
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

        if (!id || id <= 0)
            throw new DetailedError("Invalid id", 'categories', STATUS_CODES.BED_REQUEST)

        let rows = await CategoriesRepository.deleteCategory([id]);

        if (!rows.affectedRows || rows.affectedRows <= 0)
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

module.exports = CategoriesService;