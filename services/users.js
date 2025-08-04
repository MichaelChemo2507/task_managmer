const JWT = require('jsonwebtoken');
const LoginValidation = require('../utils/validation/login');
const UsersValidation = require('../utils/validation/users');
const UsersRepository = require('../repositories/users');
const DetailedError = require('../utils/errors/detailedError');
const MD5 = require('md5');

class UsersService {
    static async authorizationProcess({ userName, password }) {
        const oneDay = 24 * 60 * 60;
        let validation = new LoginValidation({ userName, password });
        validation.req_validate();

        let result = await UsersRepository.authorizationProcess([MD5(String(password) + process.env.SECRET_SALT), String(userName).trim()]);

        validation = new LoginValidation(result);
        validation.res_validate();

        const accessToken = JWT.sign({
            ID: result[0].id
        }, process.env.ACCESS_SECRET_TOKEN, { expiresIn: oneDay })

        if (!accessToken)
            throw new DetailedError('No Access Token provided.', STATUS_CODES.UNAUTHORIZED);

        return accessToken;
    }
    static async getAll() {
        let rows = await UsersRepository.getAll();
        let validation = new UsersValidation(rows);
        validation.res_validate();
        return rows;
    }
    static async addUser({ userName, email, password }) {

        let validation = new UsersValidation({ userName, password, email });
        validation.req_validate();
        let rows = await UsersRepository.addUser([String(userName).trim(), String(email).trim(), MD5(String(password) + process.env.SECRET_SALT)]);
        if (!rows.affectedRows || rows.affectedRows < 0)
            throw new DetailedError("No result from db", STATUS_CODES.BED_REQUEST)

        return rows.affectedRows;
    }
    static async deleteUser(id) {
        if (!id || id < 0)
            throw new DetailedError("Invalid id", STATUS_CODES.BED_REQUEST)
        let rows = await UsersRepository.deleteUser([id]);
        if (!rows.affectedRows || rows.affectedRows < 0)
            throw new DetailedError("No result from db", STATUS_CODES.INTERNAL_SERVER)
        return rows.affectedRows;
    }
    static async updateUser({ userName, email, password }, id) {
        if (id)
            if (typeof id !== typeof 1 || id <= 0)
                throw new DetailedError("Invalid id", STATUS_CODES.BED_REQUEST)

        let rows = await UsersRepository.updateUser([String(userName).trim(), String(email).trim(), MD5(String(password) + process.env.SECRET_SALT), id]);
        if (!rows.affectedRows || rows.affectedRows < 0)
            throw new DetailedError("No result from db", STATUS_CODES.BED_REQUEST)
        return rows.affectedRows;
    }
}


module.exports = UsersService;
