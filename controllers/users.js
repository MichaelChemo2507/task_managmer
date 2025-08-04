const UsersService = require('../services/users');

class LoginController {
    static async getLoginPage(req, res) {
        res.status(STATUS_CODES.OK).render('loginPage', {
            data: {
                btnText: 'SUBMIT',
                URL: 'http://localhost:7777/login/',
                method: 'post',
            },
        })
    }
    static async getRegistrationPage(req, res) {

    }
    static async authorizationProcess(req, res) {
        const oneDay = 24 * 60 * 60 * 1000
        const accessToken = await UsersService.authorizationProcess(req.body);
        res.cookie('token', accessToken, {
            httpOnly: true,
            maxAge: oneDay,
        });
        return res.status(STATUS_CODES.OK).json({ success: true });
    }
    static async registrationProcess(req, res) {
        
    }
    static async getAll(req, res) {
        const users = await UsersService.getAll();
        return res.status().json({ success: true, rows: users });
    }
    static async addUser(req, res) {
        const insertId = await UsersService.addUser(req.body);
        return res.status(process.env.CREATED).json({ success: true, insertId: insertId });
    }
    static async deleteUser(req, res) {
        const affectedRows = await UsersService.deleteUser(parseInt(req.query.id));
        return res.status(process.env.NO_CONTECT).json({ success: true, message: `rows by id ${id} are delete` });
    }
    static async updateUser(req, res) {
        const affectedRows = await UsersService.updateUser(req.body, parseInt(req.params.id));
        res.status(process.env.CREATED).json({ success: true, message: `rows by id ${id} are updated` });
    }
}
module.exports = LoginController;
