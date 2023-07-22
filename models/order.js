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
        full_name : { type: String, required: true },
        province: { type: String, required: true },
        city: { type: String, required: true },
        district: { type: String, required: true },
        detail: { type: String, required: true },
        postal_code : { type: String, required: true },
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