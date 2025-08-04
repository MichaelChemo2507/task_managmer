const UsersService = require('../services/users');

class UsersController {
    static async getAll(req, res) {
        const users = await UsersService.getAll();
        return res.status(STATUS_CODES.OK).json({ success: true, rows: users });
    }
    static async addUser(req, res) {
        const insertId = await UsersService.addUser(req.body);
        return res.status(STATUS_CODES.CREATED).json({ success: true, insertId: insertId });
    }
    static async deleteUser(req, res) {
        const affectedRows = await UsersService.deleteUser(parseInt(req.params.id));
        return res.status(STATUS_CODES.NO_CONTECT).json({ success: true, message: `user is delete` });
    }
    static async updateUser(req, res) {
        const affectedRows = await UsersService.updateUser(req.body, parseInt(req.params.id));
        res.status(STATUS_CODES.CREATED).json({ success: true, message: `user is updated` });
    }
}
module.exports = UsersController;
