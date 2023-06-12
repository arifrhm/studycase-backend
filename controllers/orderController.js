const { GENERAL_ERROR_CODE } = require("../constant/errorCode");
const { ERROR_SERVER } = require("../constant/errorHttp");
const { GENERAL_ERROR_MESSAGE } = require("../constant/errorMessage");
const Order = require('../models/order');
const HttpError = require('../interface/httpError');

const all = async (req, res, next) => {
    try {
        req.data = await Order.find();
        ;
        next();
    } catch (err) {
        const error = new HttpError(GENERAL_ERROR_MESSAGE, GENERAL_ERROR_CODE, ERROR_SERVER);
        next(error)
    }
}

const create = async (req, res, next) => {
    try {

        const {
            delivery_address,
            delivery_fee,
            order_items
        } = req.body;
        const order = new Order({
            delivery_address,
            delivery_fee,
            order_items
        });
        const data = await order.save();
        req.data = data;
        next();
    } catch (err) {
        const error = new HttpError(GENERAL_ERROR_MESSAGE, GENERAL_ERROR_CODE, ERROR_SERVER);
        next(error)
    }
}

const getbyID = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id);
        req.data = order;
        next();
    } catch (err) {
        const error = new HttpError(GENERAL_ERROR_MESSAGE, GENERAL_ERROR_CODE, ERROR_SERVER);
        next(error)
    }
}

const updateByID = async (req, res, next) => {
    try {
        const {
            delivery_address,
            delivery_fee,
            order_items
        } = req.body;
        await Order.findByIdAndUpdate(req.params.id,
            {
                delivery_address,
                delivery_fee,
                order_items
            });
        req.data = await Order.findById(req.params.id);
        next();
    } catch (err) {
        const error = new HttpError(GENERAL_ERROR_MESSAGE, GENERAL_ERROR_CODE, ERROR_SERVER);
        next(error)
    }
}

const deleteByID = async (req, res, next) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        req.data = order;
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

// {
//     "delivery_address": "643e9175bae7408ddc2cadaf",
//         "delivery_fee": 15000,
//             "order_items": [
//                 {
//                     "name": "Produk XYZ",
//                     "description": "Produk C Deskripsi",
//                     "price": 140000,
//                     "qty": 2,
//                     "image": "product-168397070288423.jpeg"
//                 },
//                 {
//                     "name": "Produk ABC",
//                     "description": "Produk C Deskripsi",
//                     "price": 140000,
//                     "qty": 2,
//                     "image": "product-168397070288423.jpeg"
//                 }

//             ]
// }