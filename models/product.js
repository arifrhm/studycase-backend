const mongoose = require('mongoose');
const { Schema } = mongoose;
const tagSchema = require('./tag');

const productSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, double: true, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    tag : {
        type : Schema.Types.ObjectId,
        ref : 'Tag',
        required: true
    },
});

module.exports = mongoose.model('product', productSchema);