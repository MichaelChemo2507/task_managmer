const CategoriesRepository = require('../repositories/categories');
const DetailedError = require('../utils/errors/detailedError');
const CategoriesValidation = require('../utils/validation/categories')

class CategoriesService {
    static async getAll() {
        let rows = await CategoriesRepository.getAll();
        let validation = new CategoriesValidation(rows);
        validation.res_validate();
        if (!rows[0].user_id)
            throw new DetailedError('No result from db','categories', STATUS_CODES.INTERNAL_SERVER);
        return rows;
    }
    static async getAllByUserId(values) {
        values = Number(values);
        if (!values || values === null || values < 0)
            throw new DetailedError("Invalid id", 'categories', STATUS_CODES.BED_REQUEST);
        let rows = await CategoriesRepository([values]);
        let validation = new CategoriesValidation(rows);
        validation.res_validate();
        return rows;
    }
}

module.exports = CategoriesService;