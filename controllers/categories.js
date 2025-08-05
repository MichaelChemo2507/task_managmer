const CategoriesService = require('../services/categories');

class CategoriesController {
    static async getCategoriesPage(req, res) {
        let rowsPerPage = 10;
        let page = (req.query.page !== undefined) ? req.query.page : 0;
        res.status(STATUS_CODES.OK).render('categoriesPage', {
            data: {
                result,
                page,
                totalPage
            }
        })
    }
    static async getAll(req, res) {
        const result = await CategoriesService.getAll();
        return res.status(STATUS_CODES.OK).json({ success: true, result: result });
    }
    static async getAllByUserId(req, res) {
        // const result = await CategoriesService.getAllByUserId(req.user_id);
        const result = await CategoriesService.getAllByUserId(req.params.id);
        res.status(STATUS_CODES.OK).json({ success: true, result: result });
    }
    static async addCategory(req, res) {
        console.log(req.body);

        const { categoryName, userId } = req.body;
        // const result = await CategoriesService.addCategory({categoryName,req.user_id});
        const result = await CategoriesService.addCategory({ categoryName, userId });
        res.status(STATUS_CODES.OK).json({ success: true, result: result });
    }
    static async deleteCategory(req, res) {
        const affectedRows = await CategoriesService.deleteCategory(parseInt(req.params.id));
        return res.status(STATUS_CODES.NO_CONTECT).json({ success: true, message: `category is delete` });
    }
    static async updateCategory(req, res) {
        const affectedRows = await CategoriesService.updateCategory(req.body, parseInt(req.params.id));
        res.status(STATUS_CODES.CREATED).json({ success: true, message: `category is updated` });
    }
}

module.exports = CategoriesController;