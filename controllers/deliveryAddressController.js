const HttpError = require('../interface/httpError');
const { GENERAL_ERROR_CODE } = require("../constant/errorCode");
const { ERROR_SERVER } = require("../constant/errorHttp");
const { GENERAL_ERROR_MESSAGE } = require("../constant/errorMessage");
const DeliveryAddress = require('../models/deliveryAddress');

const all = async (req, res, next) => {
    try {
        req.data = await DeliveryAddress.find();
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
            nama,
            provinsi,
            kabupaten,
            kecamatan,
            kelurahan,
            detail,
            user_id
        } = req.body;

        const deliveryAddress = new DeliveryAddress({ 
            nama : nama,
            provinsi : provinsi,
            kabupaten: kabupaten,
            kecamatan: kecamatan,
            kelurahan: kelurahan,
            detail: detail,
            user: user_id
        });

        const data = await deliveryAddress.save();
        req.data = data;
        next();
    } catch (err) {
        const error = new HttpError(GENERAL_ERROR_MESSAGE, GENERAL_ERROR_CODE, ERROR_SERVER);
        next(error)
    }
}

const getbyID = async (req, res, next) => {
    try {
        const deliveryAddress = await DeliveryAddress.findById(req.params.id);
        req.data = deliveryAddress;
        next();
    } catch (err) {
        const error = new HttpError(GENERAL_ERROR_MESSAGE, GENERAL_ERROR_CODE, ERROR_SERVER);
        next(error)
    }
}

const updateByID = async (req, res, next) => {
    try {
        const { 
            nama,
            provinsi,
            kabupaten,
            kecamatan,
            kelurahan,
            detail,
            user_id
        } = req.body;
        const deliveryAddress = await DeliveryAddress.findByIdAndUpdate(req.params.id,
            {
                nama,
                provinsi,
                kabupaten,
                kecamatan,
                kelurahan,
                detail,
                user_id
            });
        req.data = await DeliveryAddress.findById(req.params.id);
        next();
    } catch (err) {
        const error = new HttpError(GENERAL_ERROR_MESSAGE, GENERAL_ERROR_CODE, ERROR_SERVER);
        next(error)
    }
}

const deleteByID = async (req, res, next) => {
    try {
        const deliveryAddress = await DeliveryAddress.findByIdAndDelete(req.params.id);
        req.data = deliveryAddress;
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
