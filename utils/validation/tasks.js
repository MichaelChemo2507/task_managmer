const Validation = require('./validation');
const DetailedError = require('../errors/detailedError');
module.exports = class TasksValidation extends Validation {
    constructor(values) {
        super(values);
    }

    async req_validate() {
        try {
        } catch (error) {
        }
    }
    res_validate() {
        try {
            if (!this.values || typeof this.values !== 'object')
                throw new Error('No result form DB!');
        } catch (error) {
            throw new DetailedError(error.message, 'tasks', STATUS_CODES.INTERNAL_SERVER);
        }
    }
} 