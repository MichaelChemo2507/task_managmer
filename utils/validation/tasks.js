const Validation = require('./validation');
const DetailedError = require('../errors/detailedError');
const CategoriesRepository = require('../../repositories/categories');
module.exports = class TasksValidation extends Validation {
    constructor(values) {
        super(values);
    }

    async req_validate() {
        try {
            const { userId, category, date, isDone } = this.values;
            const result = await CategoriesRepository.getAllByUserId([userId]);
            result.filter((data) => { data.id === category })
            if (result.length <= 0)
                throw new Error()
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