const CategoriesService = require('../services/categories');

class CategoriesController {
    static async getAll(req, res) {
        const users = await CategoriesService.getAll();
        return res.status(STATUS_CODES.OK).json({ success: true, rows: users });
    }
}

module.exports = CategoriesController;