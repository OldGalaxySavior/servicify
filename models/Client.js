const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String },
    globalClientId: { type: String, unique: true },
    stationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Station', required: true }
});

module.exports = mongoose.model('Client', clientSchema);