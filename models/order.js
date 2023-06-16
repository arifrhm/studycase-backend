const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema({
    delivery_fee: { type: Number, required: true },
    delivery_address : {
        type : Schema.Types.ObjectId,
        ref : 'DeliveryAddress',
        required: true
    },    
    payment_status : {
        type : Schema.Types.ObjectId,
        ref : 'PaymentStatus',
        required: true
    },    
    user : {
        type : Schema.Types.ObjectId,
        ref : 'User',
        required: true
    },
    status : {
        type : Schema.Types.ObjectId,
        ref : 'OrderStatus',
        required: true
    },    
    order_items : [{
        type : Schema.Types.ObjectId,
        ref : 'OrderItems',
        required: true
    }],


});

module.exports = mongoose.model('order', orderSchema);