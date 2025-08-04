module.exports = class DetailedError extends Error {
    constructor(message,title, code) {
        if (typeof message !== typeof "" || typeof code !== typeof 0)
            throw new DetailedError("Invalid error arguments!", STATUS_CODES.INTERNAL_SERVER);
        super(message);
        this.code = code;
        this.title = title;
    }
}