const Validation = require('./validation');
const DetailedError = require('../errors/detailedError');
module.exports = class LoginValidation extends Validation {
    constructor(values) {
        super(values);
    }

    req_validate() {
        try {
            if (!this.values || typeof this.values !== 'object')
                throw new TypeError('Invalid request!');
            const { userName, password } = this.values;
            if (!userName || typeof userName !== 'string' || userName.trim().length < 3) {
                throw new Error('Invalid user name!');
            }
            if (!password || typeof password !== 'string' || password.length < 8) {
                throw new Error('Invalid password!');
            }
        } catch (error) {
            throw new DetailedError(error.message,'login', STATUS_CODES.BED_REQUEST);
        }
    }
    res_validate() {
        try {
            if (!this.values || typeof this.values !== 'object' || this.values.length == 0 || typeof this.values[0] !== 'object' || typeof this.values[0].id !== 'number')
                throw new Error('Unauthorized user!');
        } catch (error) {
            throw new DetailedError(error.message,'login', STATUS_CODES.UNAUTHORIZED);
        }
    }
} 