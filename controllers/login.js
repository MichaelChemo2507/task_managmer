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

    static async authorizationProcess(req, res) {
        const oneDay = 24 * 60 * 60 * 1000
        const accessToken = await UsersService.authorizationProcess(req.body);
        res.cookie('token', accessToken, {
            httpOnly: true,
            maxAge: oneDay,
        });
        return res.status(STATUS_CODES.OK).json({ success: true });
    }
}

module.exports = LoginController;