const { GENERAL_ERROR_CODE } = require("../constant/errorCode");
const {  ERROR_SERVER } = require("../constant/errorHttp");
const { GENERAL_ERROR_MESSAGE } = require("../constant/errorMessage");
const User = require('../models/User');
const bcrypt = require('bcrypt');
const HttpError = require('../interface/httpError');

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
        } = req.body;
        const user = new User({
            name,
            email,
            password,
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
        } = req.body;
        await User.findByIdAndUpdate(req.params.id,
            {
                name,
                email,
                password,
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

module.exports = {
    create,
    all,
    getbyID,
    updateByID,
    deleteByID
}