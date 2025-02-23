const express = require('express');
const mongoose = require('mongoose');
const Client = require('./models/Client'); // Підключаємо модель
const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB підключено'))
    .catch(err => console.log('Помилка MongoDB:', err));

// Головна сторінка
app.get('/', (req, res) => {
    res.send('Привіт, це твій додаток для СТО!');
});

// Додати клієнта
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

// Отримати всіх клієнтів
app.get('/clients', async (req, res) => {
    try {
        const clients = await Client.find();
        res.send(clients);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

app.listen(process.env.PORT || 3000, () => {
    console.log('Сервер працює');
});