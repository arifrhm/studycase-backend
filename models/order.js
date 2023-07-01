const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema({
    status: {
        type: String,
        enum: ['waiting_payment', 'processing', 'in_delivery', 'delivered'],
        default: 'waiting_payment'
    }
    ,
    delivery_address: {
        provinsi: { type: String, required: true },
        kabupaten: { type: String, required: true },
        kecamatan: { type: String, required: true },
        kelurahan: { type: String, required: true },
        detail: { type: String}
    },

    delivery_fee: { type: Number, required: true },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        required: true
    },
    order_items: [{
        type: Schema.Types.ObjectId,
        ref: 'OrderItems',
        required: true
    }],


});

module.exports = mongoose.model('order', orderSchema);