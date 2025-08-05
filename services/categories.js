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
        if (!values || values === null || values < 0)
            throw new DetailedError("Invalid data", 'categories', STATUS_CODES.BED_REQUEST);
        let result = await UsersRepository.getUserById([userId]);
        if (!result || result.length <= 0)
            throw new DetailedError("Invalid id", 'categories', STATUS_CODES.BED_REQUEST);
        console.log(userId,categoryName);
        
        let rows = await CategoriesRepository.addCategory([categoryName, userId]);
        if (rows.insertId === 0)
            throw new DetailedError("No category was added", 'categories', STATUS_CODES.INTERNAL_SERVER);
            return rows.insertId;
    }
}

module.exports = CategoriesService;