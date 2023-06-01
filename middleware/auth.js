const jwt = require('jsonwebtoken');
const HttpError = require('../interface/httpError');
const {UNAUTHORIZED_USER} = require('../constant/errorMessage');
const {NOT_AUTHENTICATED_CODE} = require('../constant/errorCode');
const {UNAUTHORIZED} = require('../constant/errorHttp');

function auth(req, res, next) {
    const token = req.header('Authorization');
    const accessError = new HttpError(UNAUTHORIZED_USER, NOT_AUTHENTICATED_CODE, UNAUTHORIZED);
    if (!token) {
        next(accessError);
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
            //process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        next(accessError);
    }
}

module.exports = auth;