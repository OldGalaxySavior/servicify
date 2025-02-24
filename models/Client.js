const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String },
    globalClientId: { type: String, unique: true }, // Унікальний ID клієнта
    stationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Station', required: true } // Прив’язка до СТО
});

module.exports = mongoose.model('Client', clientSchema);