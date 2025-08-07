const Validation = require('./validation');
const DetailedError = require('../errors/detailedError');
const CategoriesRepository = require('../../repositories/categories');
module.exports = class TasksValidation extends Validation {
    constructor(values) {
        super(values);
    }
    date_validation(dateStr) {
        let dateObj = new Date(dateStr);

        if (!isNaN(dateObj)) {

            const currentDate = new Date();

            if (inputDate >= currentDate) return true;


        }
        return false;
    }

    async req_validate() {
        try {
            const { userId, category, date, isDone } = this.values;
            
            if (Number(category) !== 0) {
               
                const result = await CategoriesRepository.getAllByUserId([userId]);
                
                result.filter(data => data.id === Number(category));
                
                if (result.length <= 0)
                    throw new Error("No category exist");

            }


            if (!this.date_validation(date))
                throw new Error("Invalid date");

            if (Number(isDone) > 2 || Number(isDone) < 1)
                throw new Error("Invalid isDone");

        } catch (error) {
            throw new DetailedError(error.message, 'tasks', STATUS_CODES.BED_REQUEST);
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