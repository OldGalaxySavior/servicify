const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    make: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    vin: { type: String, unique: true },
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
    stationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Station', required: true }
});

module.exports = mongoose.model('Car', carSchema);