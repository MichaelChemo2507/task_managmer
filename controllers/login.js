const LoginService = require('../services/login');

class LoginController {
    static async authorizationProcess(req, res) {
        let { userName, password } = req.body;
        const oneDay = 24 * 60 * 60 * 1000
        const accessToken = await LoginService.authorizationProcess({ userName, password });
        if (!accessToken)
            throw new Error('No Access Token provided.', STATUS_CODES.UNAUTHORIZED);
        res.cookie('token', accessToken, {
            httpOnly: true,
            maxAge: oneDay,
        });
        return res.status(STATUS_CODES.OK);
    }
}
module.exports = LoginController;
