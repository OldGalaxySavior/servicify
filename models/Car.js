const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    make: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    vin: { type: String, unique: true, required: true },
    currentOwnerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' } // Поточний власник
});

module.exports = mongoose.model('Car', carSchema);