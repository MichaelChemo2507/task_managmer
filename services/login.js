const JWT = require('jsonwebtoken');
const LoginValidation = require('../utils/validation/login');
const UsersRepository = require('../repositories/users');
const DetailedError = require('../utils/errors/detailedError');
const MD5 = require('md5');

class LoginService {
    static async authorizationProcess(values) {
        const oneDay = 24 * 60 * 60;
        if (!values || typeof values !== 'object')
            throw new DetailedError('Unvalid varables type sent from the controller!', STATUS_CODES.INTERNAL_SERVER);

        const { userName, password } = values;
        let validation = new LoginValidation({ userName, password });
        validation.req_validate();

        let result = await UsersRepository.authorizationProcess([String(userName).trim(), MD5(String(password) + process.env.SECRET_SALT)]);

        validation = new LoginValidation(result);
        validation.res_validate();

        const accessToken = JWT.sign({
            ID: result[0].id
        }, process.env.ACCESS_SECRET_TOKEN, { expiresIn: oneDay })
        return accessToken;
    }
}

module.exports = LoginService;