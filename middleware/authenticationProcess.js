const JWT = require('jsonwebtoken');
const DetailedError = require('../utils/errors/detailedError');

function authenticationProcess(req, res, next) {
    try {
        const jwtToken = req.cookies.token;
        req.user_id = -1;
        if (!jwtToken || typeof jwtToken === typeof "") {
            JWT.verify(jwtToken, process.env.ACCESS_SECRET_TOKEN, (err, decodedToken) => {
                if (err)
                    throw new Error("Faild to authinticate");
                else {
                    req.user_id = decodedToken.ID;
                }
            })
        }
        if (req.user_id <= 0)
            throw new Error("Authorization expired. login required.");
        next();
    } catch (err) {
        const error = new DetailedError(err.message,"authentication_process", STATUS_CODES.FORBIDDEN);
        next(error);
    }
}
module.exports = authenticationProcess;