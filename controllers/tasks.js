
const TasksService = require('../services/tasks');
const CategoriesService = require('../services/categories')

class TasksController {
    static async getTasksPage(req, res) {

        const rowsPerPage = 10.0;
        const page = (req.query.page !== undefined) ? req.query.page : 0;

        const { category, isDone } = req.query

        const categories = await CategoriesService.getAllByUserId(req.user_id);

        const result = await TasksService.getAllByUserId(req.user_id, { page, rowsPerPage }, { category, isDone });

        let totalPages = await TasksService.getTotalPages(req.user_id);

        totalPages = Math.ceil(totalPages / rowsPerPage);
        console.log(categories);

        res.status(STATUS_CODES.OK).render('tasksPage', {
            data: {
                sortParameters: { category, isDone },
                categories,
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

        const result = await TasksService.addTask({ userId, ...req.body });

        res.status(STATUS_CODES.OK).redirect("tasks/page");
    }
    static async deleteTask(req, res) {
        const affectedRows = await TasksService.deleteTask(parseInt(req.params.id));
        console.log(affectedRows);

        return res.status(STATUS_CODES.NO_CONTECT).redirect("../page");
    }
    static async updateTask(req, res) {
        const userId = req.user_id;

        const affectedRows = await TasksService.updateTask({ userId, ...req.body }, parseInt(req.params.id));

        res.status(STATUS_CODES.CREATED).redirect("page");
    }
}

module.exports = TasksController;