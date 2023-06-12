const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema({
    delivery_fee: { type: Number, required: true },
    // delivery_address : deliveryAddressSchema,
    // payment_status : paymentStatusSchema,
    // user : userSchema,
    // status : orderStatusSchema,
    // order_items : orderItemsSchema,


});

module.exports = mongoose.model('order', orderSchema);