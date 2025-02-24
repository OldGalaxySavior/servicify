const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    carId: { type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true },
    date: { type: Date, default: Date.now },
    description: { type: String, required: true },
    cost: { type: Number, required: true }
});

module.exports = mongoose.model('Service', serviceSchema);