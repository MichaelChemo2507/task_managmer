const UsersService = require('../services/users');

class RegistrationController {
    static async getRegistrationPage(req, res) {
        res.status(STATUS_CODES.OK).render('registrationPage', {
            data: {
                btnText: 'SUBMIT',
                URL: 'http://localhost:7777/registration/',
                LOGIN_URL:'http://localhost:7777/login/',
                method: 'post',
            },
        });
    }
    static async registrationProcess(req, res) {
        const insertId = await UsersService.addUser(req.body);
        res.status(STATUS_CODES.OK).render('messagePage', {
            data: {
                message: "Your Registration Was Successfully Completed!"
            },
            variables: {
                page_title: "Successful Registration",
                linkText: "Go To Login Page.",
                URL: "http://localhost:7777/login/"
            }
        });
    }
}

module.exports = RegistrationController;