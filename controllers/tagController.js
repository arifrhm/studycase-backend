const HttpError = require('../interface/httpError');
const Tag = require('../models/tag');
const { DATA_NOT_FOUND_CODE, GENERAL_ERROR_CODE } = require('../constant/errorCode');
const { BAD_REQUEST, ERROR_SERVER } = require('../constant/errorHttp');
const { DATA_NOT_FOUND_MESSAGE, GENERAL_ERROR_MESSAGE } = require('../constant/errorMessage');
const { number, generalMessage } = require('../constant/app');



const byId = async (req, res, next) => {
    const id = req.params.pid;
    try {
        const dataTag = await Tag.findById(id);
        req.data = dataTag;
        next();
    } catch (error) {
        const err = new HttpError(GENERAL_ERROR_MESSAGE, ERROR_SERVER);
        return next(err)
    }

}

const all = async (req, res, next) => {
    try {
        const data = await Tag.find();
        if (data && data.length === number.ZERO) {
            const error = new HttpError(DATA_NOT_FOUND_MESSAGE, DATA_NOT_FOUND_CODE, BAD_REQUEST);
            return next(error);
        }
        req.data = data;
        next();
    } catch (error) {
        const err = new HttpError(GENERAL_ERROR_MESSAGE, ERROR_SERVER);
        return next(err)
    }
}

const create = async (req, res, next) => {

    try {
        const payloadTag = new Tag({
            name: req.body.name
        })
        const data = await payloadTag.save();
        req.data = data;
        next();
    } catch (error) {
        const err = new HttpError(GENERAL_ERROR_MESSAGE, GENERAL_ERROR_CODE, ERROR_SERVER)
        return next(err);
    }
}

const update = async (req, res, next) => {
    const id = req.params.pid;
    const { name } = req.body;
    try {
        let data = await Tag.findByIdAndUpdate(id, { name }, {
            new: true
        });
        req.data = data;
        next();
    } catch (error) {
        const err = new HttpError(GENERAL_ERROR_MESSAGE, GENERAL_ERROR_CODE, ERROR_SERVER)
        return next(err)
    }

}

const destroy = async (req, res, next) => {
    const tagId = req.params.pid;
    try {
        await Tag.findByIdAndRemove(tagId);
        req.data = true;
        next();
    } catch (error) {
        const err = new HttpError(GENERAL_ERROR_MESSAGE, GENERAL_ERROR_CODE, ERROR_SERVER)
        return next(err)
    }
}

module.exports = {
    byId,
    all,
    create,
    update,
    destroy
}