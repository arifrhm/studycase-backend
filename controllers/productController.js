const HttpError = require('../interface/httpError');
const { GENERAL_ERROR_CODE } = require("../constant/errorCode");
const { ERROR_SERVER } = require("../constant/errorHttp");
const { GENERAL_ERROR_MESSAGE } = require("../constant/errorMessage");
const Product = require('../models/product');

const all = async (req, res, next) => {
    try {
        req.data = await Product.find();
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
            description,
            price,
            image,
            category,
            tag
        } = req.body;
        const product = new Product({
            name,
            description,
            price,
            image,
            category,
            tag
        });
        const data = await product.save();
        req.data = data;
        next();
    } catch (err) {
        console.log(err)
        const error = new HttpError(GENERAL_ERROR_MESSAGE, GENERAL_ERROR_CODE, ERROR_SERVER);
        next(error)
    }
}

// const getbyID = async (req, res, next) => {
//     try {
//         const product = await Product.findById(req.params.id);
//         req.data = product;
//         next();
//     } catch (err) {
//         const error = new HttpError(GENERAL_ERROR_MESSAGE, GENERAL_ERROR_CODE, ERROR_SERVER);
//         next(error)
//     }
// }

const updateByID = async (req, res, next) => {
    try {
        const { name,
            description,
            price,
            image,
            category,
            // tag 
        } = req.body;
        const product = await Product.findByIdAndUpdate(req.params.id,
            {
                name,
                description,
                price,
                image,
                category
            });
        req.data = await Product.findById(req.params.id);
        next();
    } catch (err) {
        const error = new HttpError(GENERAL_ERROR_MESSAGE, GENERAL_ERROR_CODE, ERROR_SERVER);
        next(error)
    }
}

const deleteByID = async (req, res, next) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        req.data = product;
        next();
    } catch (err) {
        const error = new HttpError(GENERAL_ERROR_MESSAGE, GENERAL_ERROR_CODE, ERROR_SERVER);
        next(error)
    }
}

const searchByQueryParams = async (req, res, next) => {
    const query = req.query.query;
    console.log(query);
    try {
        // Perform the search query using Mongoose
        const results = await Product.find({ name: { $regex: query, $options: 'i' } });
        req.data = results;
        next();
    } catch (err) {
        console.log(err);
        const error = new HttpError(GENERAL_ERROR_MESSAGE, GENERAL_ERROR_CODE, ERROR_SERVER);
        next(error)
    }
}

module.exports = {
    create,
    all,
    getbyID,
    updateByID,
    deleteByID,
    searchByQueryParams
}