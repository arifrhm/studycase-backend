const mongoose = require('mongoose');
const { Schema } = mongoose;

const deliveryAddressSchema = new Schema({
    nama: { type: String, required: true },
    provinsi: { type: String, required: true },
    kabupaten: { type: String, double: true, required: true },
    kecamatan: { type: String, required: true },
    kelurahan: { type: String, required: true },
    detail: { type: String, required: true },
    // user : userSchema,
});

module.exports = mongoose.model('delivery_address', deliveryAddressSchema);