const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    carId: { type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true },
    date: { type: Date, default: Date.now },
    description: { type: String, required: true },
    cost: { type: Number, required: true },
    stationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Station', required: true },
    allowedStations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Station' }] // СТО з доступом
});

module.exports = mongoose.model('Service', serviceSchema);