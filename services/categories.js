const CategoriesRepository = require('../repositories/categories');
const CategoriesValidation = require('../utils/validation/categories')

class CategoriesService {
    static async getAll() {
        let rows = await CategoriesRepository.getAll();
        let validation = new CategoriesValidation(rows);
        validation.res_validate();
        return rows;
    }
}

module.exports = CategoriesService;