module.exports = class Validation {
    constructor(values) {
        if (!values || typeof values !== 'object')
            throw new TypeError('Invalid variables are sen', UNAUTHORIZED);
        this.values = values;
    }
}