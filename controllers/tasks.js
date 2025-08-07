
const TasksService = require('../services/tasks');

class TasksController {
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
        const result = await TasksService.getAll();

        return res.status(STATUS_CODES.OK).json({ success: true, result: result });
    }
    static async getAllByUserId(req, res) {
        const result = await TasksService.getAllByUserId(req.user_id);

        res.status(STATUS_CODES.OK).json({ success: true, result: result });
    }
    static async addTask(req, res) {
        const userId = req.user_id;

        // const result = await TasksService.addTask({ userId, ...req.body });
        const result = await TasksService.addTask(req.body);

        res.status(STATUS_CODES.OK).json({ sa: "ss" });
    }
    static async deleteTask(req, res) {
        const affectedRows = await TasksService.deleteTask(parseInt(req.params.id));
console.log(affectedRows);

        return res.status(STATUS_CODES.NO_CONTECT).send("delete");
    }
    static async updateTask(req, res) {
        const userId = req.user_id;

        // const affectedRows = await TasksService.updateTask({ userId, ...req.body }, parseInt(req.params.id));
        const affectedRows = await TasksService.updateTask(req.body, parseInt(req.params.id));

        res.status(STATUS_CODES.CREATED).send("sda");
    }
}

module.exports = TasksController;