const Validation = require('./validation');
module.exports = class LoginValidation extends Validation {
    constructor(values) {
        super(values);
    }

    validate() {
        const { userName, password } = this.values;
        if (!userName || typeof userName !== 'string' || userName.trim().length < 3) {
            throw new Error('Invalid userName!', UNAUTHORIZED);
        }
        if (!password || typeof password !== 'string' || password.length < 8) {
            throw new Error('Invalid password!', UNAUTHORIZED);
        }
    }
} 