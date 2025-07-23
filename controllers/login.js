const md5 = require('md5');

class LoginController {
    static async authorizationProcess(req, res) {
        let { email, password } = req.body;
        const oneDay = 24 * 60 * 60 * 1000
        if (!email || !password || email == null || password == null) {
            throw new Error('Invalid values were sent.', BED_REQUEST);
        } const accessToken = await LoginService.authorizationProcess([md5(String(password) + process.env.MD5_SECRET_KEY), String(email)]);
        if (!accessToken)
            throw new DetailedError('No Access Token provided.', UNAUTHORIZED);
        res.cookie('token', accessToken, {
            httpOnly: true,
            maxAge: oneDay,
        });
        return res.status(process.env.OK).redirect("http://localhost:7777/courses/listPage");
    }
}
module.exports = LoginController;
