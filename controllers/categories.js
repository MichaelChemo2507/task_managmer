const CategoriesService = require('../services/categories');

class CategoriesController {
    static async getCategoriesPage(req, res) {
        const rowsPerPage = 10.0;
        const page = (req.query.page !== undefined) ? req.query.page : 0;
        const result = await CategoriesService.getAllByUserId(req.user_id, { page, rowsPerPage });
        let totalPages = await CategoriesService.getTotalPages(req.user_id);
        totalPages = Math.ceil(totalPages / rowsPerPage);
        res.status(STATUS_CODES.OK).render('categoriesPage', {
            data: {
                result,
                page,
                totalPages
            }
        })
    }
    static async getAll(req, res) {
        const result = await CategoriesService.getAll();

        return res.status(STATUS_CODES.OK).json({ success: true, result: result });
    }
    static async getAllByUserId(req, res) {
        const result = await CategoriesService.getAllByUserId(req.user_id);

        res.status(STATUS_CODES.OK).json({ success: true, result: result });
    }
    static async addCategory(req, res) {
        const userId = req.user_id;
        const { categoryName } = req.body;

        const result = await CategoriesService.addCategory({ categoryName, userId });

        res.status(STATUS_CODES.OK).redirect("categories/page");
    }
    static async deleteCategory(req, res) {
        const affectedRow = await CategoriesService.deleteCategory(parseInt(req.params.id));

        return res.status(STATUS_CODES.NO_CONTECT).redirect("http://localhost:7777/categories/page");
    }
    static async updateCategory(req, res) {
        const affectedRows = await CategoriesService.updateCategory(req.body, parseInt(req.params.id));

        res.status(STATUS_CODES.CREATED).redirect("http://localhost:7777/categories/page");
    }
}

module.exports = CategoriesController;