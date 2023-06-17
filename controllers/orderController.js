const { GENERAL_ERROR_CODE } = require("../constant/errorCode");
const { ERROR_SERVER } = require("../constant/errorHttp");
const { GENERAL_ERROR_MESSAGE } = require("../constant/errorMessage");
const Order = require('../models/order');
const DeliveryAddress = require('../models/deliveryAddress');
const OrderItem = require('../models/orderItem');

const HttpError = require('../interface/httpError');
const statusPayment = { WAITING: 'WAITING'};

const all = async (req, res, next) => {
    try {

        const datas = await Order.find().populate('order_items').sort('-createdAt');
        req.data = {
            data: datas.map(data => data.toJSON({ virtuals: true }))
        };
        next();
    } catch (err) {
        const error = new HttpError(GENERAL_ERROR_MESSAGE, GENERAL_ERROR_CODE, ERROR_SERVER);
        next(error);
    }
}

const create = async (req, res, next) => {
    try {
        const { delivery_fee, delivery_address, order_items } = req.body;
        const address = await DeliveryAddress.findById(delivery_address.toString());
        const payloadOrder = new Order({
            status : statusPayment.WAITING,
            delivery_address: {
                provinsi: address.provinsi,
                kabupaten: address.kabupaten,
                kecamatan: address.kecamatan,
                kelurahan: address.kelurahan,
                detail: address.detail
            },
            delivery_fee: delivery_fee,
            user: address.user._id
        });
        const order = await payloadOrder.save();
        const orderItems = await OrderItem.insertMany(order_items.map(item => ({
            name: item.name,
            description: item.description,
            price: parseInt(item.price),
            qty: parseInt(item.qty),
            imageUrl: item.image,
            order: order._id
        })));
        const orderItemsId = orderItems.map(item => item._id);
        const newOrder = await Order.findByIdAndUpdate(order._id, { order_items: orderItemsId }, {
            new: true
        });
        req.data = newOrder;
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