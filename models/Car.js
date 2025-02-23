const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    make: { type: String, required: true }, // Марка (наприклад, Toyota)
    model: { type: String, required: true }, // Модель (наприклад, Corolla)
    year: { type: Number, required: true }, // Рік випуску
    vin: { type: String, unique: true }, // VIN-код (опціонально унікальний)
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true } // Посилання на клієнта
});

module.exports = mongoose.model('Car', carSchema);