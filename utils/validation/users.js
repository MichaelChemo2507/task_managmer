const Validation = require('./validation');
const DetailedError = require('../errors/detailedError');
module.exports = class UsersValidation extends Validation {
    constructor(values) {
        super(values);
    }

    req_validate() {
        try {
            if (!this.values || typeof this.values !== 'object')
                throw new TypeError('Invalid request!');
            const { userName, password, email} = this.values;
            if (!userName || typeof userName !== 'string' || userName.trim().length < 3) {
                throw new Error('Invalid user name!');
            }
            if (!password || typeof password !== 'string' || password.length < 8) {
                throw new Error('Invalid password!');
            }
            if (!email || typeof email !== 'string' || email.trim().length < 5) {
                throw new Error('Invalid email!');
            }
            

        } catch (error) {
            throw new DetailedError(error.message,'users', STATUS_CODES.BED_REQUEST);
        }
    }
    res_validate() {
        try {
            if (!this.values || typeof this.values !== 'object' || this.values.length == 0 || typeof this.values[0] !== 'object' || !this.values[0].id || !this.values[0].user_name || !this.values[0].email || !this.values[0].password)
                throw new Error('No result form DB!');
        } catch (error) {
            throw new DetailedError(error.message,'users', STATUS_CODES.BED_REQUEST);
        }
    }
} 