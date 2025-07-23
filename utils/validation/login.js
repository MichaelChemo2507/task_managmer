const Validation = require('./validation');
module.exports = class LoginValidation extends Validation {
    constructor(values) {
        super(values);
    }

    req_validate() {
        if (!this.values || typeof this.values !== 'object')
            throw new TypeError('Invalid request!', UNAUTHORIZED);
        const { userName, password } = this.values;
        if (!userName || typeof userName !== 'string' || userName.trim().length < 3) {
            throw new Error('Invalid userName!', UNAUTHORIZED);
        }
        if (!password || typeof password !== 'string' || password.length < 8) {
            throw new Error('Invalid password!', UNAUTHORIZED);
        }
    }
    res_validate() {
        if (!this.values || typeof this.values !== 'object' || result.length == 0)
            throw new TypeError('No respons from DB!', UNAUTHORIZED);
        if (typeof this.values[0] !== 'object' || typeof this.values[0].id !== 'number')
            throw new Error('Unauthorized user!', UNAUTHORIZED);
    }
} 