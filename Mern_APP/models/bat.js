const mongoose = require('mongoose');

const batSchema = new mongoose.Schema({
    brandName: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    desc: { type: String, required: true, trim: true },
    brandAmbassador: { type: String, required: true }
});

module.exports = mongoose.model('Bat', batSchema);
