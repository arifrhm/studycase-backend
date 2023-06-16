const mongoose = require('mongoose');
const { Schema } = mongoose;

const invoiceSchema = new Schema({
    sub_total: { type: Number, required: true },
    delivery_fee: { type: Number, required: true },
    total: { type: Number, double: true, required: true },
    delivery_address : {
        type : Schema.Types.ObjectId,
        ref : 'DeliveryAddress'
    },
    payment_status : {
        type : Schema.Types.ObjectId,
        ref : 'PaymentStatus'
    },

});

module.exports = mongoose.model('invoice', invoiceSchema);