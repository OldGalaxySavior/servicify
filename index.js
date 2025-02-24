const express = require('express');
const mongoose = require('mongoose');
const Client = require('./models/Client');
const Car = require('./models/Car');
const Service = require('./models/Service');
const Station = require('./models/Station'); // Додаємо Station
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB підключено'))
    .catch(err => console.log('Помилка MongoDB:', err));

// Головна сторінка
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// --- СТО ---
app.post('/stations', async (req, res) => {
    try {
        const station = new Station({ name: req.body.name, location: req.body.location });
        await station.save();
        res.status(201).send(station);
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
});
app.get('/stations', async (req, res) => {
    try {
        const stations = await Station.find();
        res.send(stations);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

// --- Клієнти ---
app.post('/clients', async (req, res) => {
    try {
        console.log('Дані від фронтенду:', req.body); // Для дебагу
        const client = new Client({
            name: req.body.name,
            phone: req.body.phone,
            email: req.body.email,
            globalClientId: req.body.globalClientId || new mongoose.Types.ObjectId().toString(),
            stationId: req.body.stationId
        });
        await client.save();
        res.status(201).send(client);
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
});

app.get('/clients', async (req, res) => {
    try {
        const stationId = req.query.stationId; // Фільтр за СТО
        const clients = await Client.find(stationId ? { stationId } : {});
        res.send(clients);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

app.put('/clients/:id', async (req, res) => {
    try {
        const client = await Client.findByIdAndUpdate(
            req.params.id,
            { name: req.body.name, phone: req.body.phone, email: req.body.email, stationId: req.body.stationId },
            { new: true, runValidators: true }
        );
        if (!client) return res.status(404).send({ error: 'Клієнт не знайдений' });
        res.send(client);
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
});

app.delete('/clients/:id', async (req, res) => {
    try {
        const client = await Client.findByIdAndDelete(req.params.id);
        if (!client) return res.status(404).send({ error: 'Клієнт не знайдений' });
        res.send({ message: 'Клієнт видалений', client });
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
});

// --- Автомобілі ---
app.post('/cars', async (req, res) => {
    try {
        const car = new Car({
            make: req.body.make,
            model: req.body.model,
            year: req.body.year,
            vin: req.body.vin,
            clientId: req.body.clientId,
            stationId: req.body.stationId
        });
        await car.save();
        res.status(201).send(car);
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
});

app.get('/cars', async (req, res) => {
    try {
        const stationId = req.query.stationId;
        const cars = await Car.find().populate('clientId', 'name phone');
        res.send(cars);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

app.put('/cars/:id', async (req, res) => {
    try {
        const car = await Car.findByIdAndUpdate(
            req.params.id,
            { make: req.body.make, model: req.body.model, year: req.body.year, vin: req.body.vin, clientId: req.body.clientId },
            { new: true, runValidators: true }
        );
        if (!car) return res.status(404).send({ error: 'Автомобіль не знайдений' });
        res.send(car);
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
});

app.delete('/cars/:id', async (req, res) => {
    try {
        const car = await Car.findByIdAndDelete(req.params.id);
        if (!car) return res.status(404).send({ error: 'Автомобіль не знайдений' });
        res.send({ message: 'Автомобіль видалений', car });
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
});

// --- Історія обслуговування ---
app.post('/services', async (req, res) => {
    try {
        const service = new Service({
            carId: req.body.carId,
            description: req.body.description,
            cost: req.body.cost
        });
        await service.save();
        res.status(201).send(service);
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
});

app.get('/services', async (req, res) => {
    try {
        const services = await Service.find().populate('carId', 'make model vin');
        res.send(services);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

app.put('/services/:id', async (req, res) => {
    try {
        const service = await Service.findByIdAndUpdate(
            req.params.id,
            { carId: req.body.carId, description: req.body.description, cost: req.body.cost },
            { new: true, runValidators: true }
        );
        if (!service) return res.status(404).send({ error: 'Запис не знайдений' });
        res.send(service);
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
});

app.delete('/services/:id', async (req, res) => {
    try {
        const service = await Service.findByIdAndDelete(req.params.id);
        if (!service) return res.status(404).send({ error: 'Запис не знайдений' });
        res.send({ message: 'Запис видалений', service });
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
});

app.listen(process.env.PORT || 3000, () => {
    console.log('Сервер працює');
});