const CategoriesRepository = require('../repositories/categories');
const UsersRepository = require('../repositories/users')
const DetailedError = require('../utils/errors/detailedError');
const CategoriesValidation = require('../utils/validation/categories')

class CategoriesService {
    static async getAll() {
        let rows = await CategoriesRepository.getAll();
       
        let validation = new CategoriesValidation(rows);
        validation.res_validate();
       
        if (!rows[0].user_id)
            throw new DetailedError('No result from db', 'categories', STATUS_CODES.INTERNAL_SERVER);
       
        return rows;
    }
    static async getAllByUserId(values) {
        values = Number(values);
       
        if (!values || values === null || values < 0)
            throw new DetailedError("Invalid id", 'categories', STATUS_CODES.BED_REQUEST);
       
        let rows = await CategoriesRepository.getAllByUserId([values]);
       
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

module.exports = CategoriesService;