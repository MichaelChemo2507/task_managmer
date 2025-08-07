module.exports = class Validation {
    constructor(values) {
        if(!values) throw new Error("No values for the validation process");
        this.values = values;
    }

}