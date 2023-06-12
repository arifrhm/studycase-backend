const generateToken = require('../utils/generateToken');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const HttpError = require('../interface/httpError');
const { NOT_AUTHENTICATED_CODE,GENERAL_ERROR_CODE } = require("../constant/errorCode");
const { UNAUTHORIZED, ERROR_SERVER } = require("../constant/errorHttp");
const { UN_AUTHENTICATED, GENERAL_ERROR_MESSAGE } = require("../constant/errorMessage");

//Create genreate token endpoint
const login = async function (req, res, next) {
    try {
        const { name,
            email,
            password,
            isAdmin,
        } = req.body;
        // Check if user exists and password is correct
        const user = await User.findOne({ name: name, email: email });
        const validPassword = await bcrypt.compare(password, user.password);

        const errorUnauthenticated = new HttpError(UN_AUTHENTICATED, NOT_AUTHENTICATED_CODE, UNAUTHORIZED);

        if (!user || !validPassword) {
            next(errorUnauthenticated);
        }
        const token = generateToken(user);
        delete user.password;
        req.data = {
            user_email: user.email,
            token: token
        };
        next();
    } catch (err) {
        console.log(err);
        const error = new HttpError(GENERAL_ERROR_MESSAGE, GENERAL_ERROR_CODE, ERROR_SERVER);
        next(error);
    }
}

module.exports = {
    login
}