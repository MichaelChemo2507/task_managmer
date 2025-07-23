const JWT = require('jsonwebtoken');
const LoginValidation = require('../utils/validation/login'); 
const md5 = require('md5');

class LoginService {
    static async authorizationProcess(values) {
        const oneDay = 24 * 60 * 60;
        if (!values || typeof values !== 'object')
            throw new TypeError('Unvalid varables type sent from the controller!', UNAUTHORIZED);
        
        const validation = new LoginValidation(values);
        validation.validate();

        values = Object.values(values);
        let result = await UsersModel.authorizationProcess(values);
        if (!result || result.length == 0)
            throw new Error('Unauthorized user!', UNAUTHORIZED);
        const accessToken = JWT.sign({
            ID: result[0].ID
        }, process.env.ACCESS_SECRET_TOKEN, { expiresIn: oneDay })
        return accessToken;
    }
}

module.exports = LoginService;