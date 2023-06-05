const { NOT_AUTHENTICATED_CODE,GENERAL_ERROR_CODE } = require("../constant/errorCode");
const { UNAUTHORIZED, ERROR_SERVER } = require("../constant/errorHttp");
const { UN_AUTHENTICATED, GENERAL_ERROR_MESSAGE } = require("../constant/errorMessage");
const User = require('../models/User');
const bcrypt = require('bcrypt');
const HttpError = require('../interface/httpError');
const generateToken = require('../middleware/generateToken');

const all = async (req, res, next) => {
    try {
        req.data = await User.find();
        ;
        next();
    } catch (err) {
        const error = new HttpError(GENERAL_ERROR_MESSAGE, GENERAL_ERROR_CODE, ERROR_SERVER);
        next(error)
    }
}

const create = async (req, res, next) => {
    try {

        const { name,
            email,
            password,
            isAdmin,
        } = req.body;
        const user = new User({
            name,
            email,
            password,
            isAdmin,
        });
        const data = await user.save();
        req.data = data;
        next();
    } catch (err) {
        const error = new HttpError(GENERAL_ERROR_MESSAGE, GENERAL_ERROR_CODE, ERROR_SERVER);
        next(error)
    }
}

const getbyID = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        req.data = user;
        next();
    } catch (err) {
        const error = new HttpError(GENERAL_ERROR_MESSAGE, GENERAL_ERROR_CODE, ERROR_SERVER);
        next(error)
    }
}

const updateByID = async (req, res, next) => {
    try {
        const { name,
            email,
            password,
            isAdmin,
        } = req.body;
        await User.findByIdAndUpdate(req.params.id,
            {
                name,
                email,
                password,
                isAdmin,
            });
        req.data = await User.findById(req.params.id);
        next();
    } catch (err) {
        const error = new HttpError(GENERAL_ERROR_MESSAGE, GENERAL_ERROR_CODE, ERROR_SERVER);
        next(error)
    }
}

const deleteByID = async (req, res, next) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        req.data = user;
        next();
    } catch (err) {
        const error = new HttpError(GENERAL_ERROR_MESSAGE, GENERAL_ERROR_CODE, ERROR_SERVER);
        next(error)
    }
}

//Create genreate token endpoint
const login = async function (req, res, next) {
    try {
        const { name,
            email,
            password,
            isAdmin,
        } = req.body;
        
        // Check if user exists and password is correct
        const user = await User.findOne({name: name, email: email });  
        const validPassword = await bcrypt.compare(password, user.password);

        const errorUnauthenticated = new HttpError(UN_AUTHENTICATED, NOT_AUTHENTICATED_CODE, UNAUTHORIZED);

        if (!user||!validPassword) {
            next(errorUnauthenticated);
        }
        const token = generateToken(user);
        delete user.password;
        req.data = {
            user_email : user.email,
            token : token
        };
        next();
    } catch (err) {
        console.log(err);
        const error = new HttpError(GENERAL_ERROR_MESSAGE, GENERAL_ERROR_CODE, ERROR_SERVER);
        next(error);
    }
  }

module.exports = {
    create,
    all,
    getbyID,
    updateByID,
    deleteByID,
    login
}