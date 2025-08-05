const Validation = require('./validation');
const DetailedError = require('../errors/detailedError');
const UsersRepository = require('../../repositories/users')
module.exports = class CategoriesValidation extends Validation {
    constructor(values) {
        super(values);
    }

    async req_validate() {
        try {
            const { userId, categoryName } = this.values;
            if (!userId || userId === null)
                throw new Error("No id");
            
            if (!categoryName || categoryName === null)
                throw new Error("No category name");
                
            let result = await UsersRepository.getUserById([Number(userId)]);
            if (!result || result.length <= 0)
                throw new Error("Invalid id");
        } catch (error) {
            throw new DetailedError(error.message,'categories',STATUS_CODES.BED_REQUEST)
        }
    }
    res_validate() {
        try {
            if (!this.values || typeof this.values !== 'object' )
                throw new Error('No result form DB!');

        } catch (error) {
            throw new DetailedError(error.message, 'categories', STATUS_CODES.INTERNAL_SERVER);
        }
    }
} 