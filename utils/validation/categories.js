const Validation = require('./validation');
const DetailedError = require('../errors/detailedError');
module.exports = class CategoriesValidation extends Validation {
    constructor(values) {
        super(values);
    }

    req_validate() {
    }
    res_validate() {
        try {
            if (!this.values || typeof this.values !== 'object' || this.values.length == 0 || typeof this.values[0] !== 'object' || !this.values[0].id || !this.values[0].category_name)
                throw new Error('No result form DB!');
            
        } catch (error) {
            throw new DetailedError(error.message,'categories', STATUS_CODES.INTERNAL_SERVER);
        }
    }
} 