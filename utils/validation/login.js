const Validation = require('./validation');
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
                throw new Error('Invalid userName!');
            }
            if (!password || typeof password !== 'string' || password.length < 8) {
                throw new Error('Invalid password!');
            }
        } catch (error) {
            throw new Error(error.message, STATUS_CODES.BED_REQUEST);
        }
    }
    res_validate() {
        try {
            if (!this.values || typeof this.values !== 'object' || result.length == 0)
                throw new TypeError('No respons from DB!');
            if (typeof this.values[0] !== 'object' || typeof this.values[0].id !== 'number')
                throw new Error('Unauthorized user!');
        } catch (error) {
            throw new Error(error.message, STATUS_CODES.UNAUTHORIZED);
        }
    }
} 