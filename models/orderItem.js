const mongoose = require('mongoose');
const { Schema } = mongoose;


const orderItemSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    qty: { type: Number, required: true },
    product : {
        type : Schema.Types.ObjectId,
        ref : 'Product',
        required: true
    },    
    order : {
        type : Schema.Types.ObjectId,
        ref : 'Order',
        required: true
    }, 
});

module.exports = mongoose.model('orderItem', orderItemSchema);