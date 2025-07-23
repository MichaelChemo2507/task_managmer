
class LoginController {
    static async authorizationProcess(req, res) {
        let { userName, password } = req.body;
        const oneDay = 24 * 60 * 60 * 1000
        const accessToken = await LoginService.authorizationProcess({ userName, password });
        if (!accessToken)
            throw new Error('No Access Token provided.', UNAUTHORIZED);
        res.cookie('token', accessToken, {
            httpOnly: true,
            maxAge: oneDay,
        });
        return res.status(process.env.OK).redirect("http://localhost:7777/courses/listPage");
    }
}
module.exports = LoginController;
