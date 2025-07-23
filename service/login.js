const JWT = require('jsonwebtoken');
const LoginValidation = require('../utils/validation/login');
const md5 = require('md5');

class LoginService {
    static async authorizationProcess(values) {
        const oneDay = 24 * 60 * 60;
        if (!values || typeof values !== 'object')
            throw new TypeError('Unvalid varables type sent from the controller!', UNAUTHORIZED);

        let validation = new LoginValidation(values);
        validation.req_validate();

        values = Object.values({ userName, password } = values);
        let result = await UsersModel.authorizationProcess(values);
        
        validation = new LoginValidation(result);
        validation.res_validate();

        const accessToken = JWT.sign({
            ID: result[0].id
        }, process.env.ACCESS_SECRET_TOKEN, { expiresIn: oneDay })
        return accessToken;
    }
}

module.exports = LoginService;