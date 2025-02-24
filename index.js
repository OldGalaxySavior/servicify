const express = require('express');
const mongoose = require('mongoose');
const Client = require('./models/Client');
const Car = require('./models/Car');
const Service = require('./models/Service');
const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB підключено'))
    .catch(err => console.log('Помилка MongoDB:', err));

// Головна сторінка
app.get('/', (req, res) => {
    res.send('Привіт, це твій додаток для СТО!');
});

// --- Клієнти ---
app.post('/clients', async (req, res) => {
    try {
        const client = new Client({
            name: req.body.name,
            phone: req.body.phone,
            email: req.body.email
        });
        await client.save();
        res.status(201).send(client);
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
});

app.get('/clients', async (req, res) => {
    try {
        const clients = await Client.find();
        res.send(clients);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

app.put('/clients/:id', async (req, res) => {
    try {
        const client = await Client.findByIdAndUpdate(
            req.params.id,
            { name: req.body.name, phone: req.body.phone, email: req.body.email },
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
            clientId: req.body.clientId
        });
        await car.save();
        res.status(201).send(car);
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
});

app.get('/cars', async (req, res) => {
    try {
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