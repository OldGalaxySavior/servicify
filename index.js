const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

// Підключення до локального MongoDB
mongoose.connect('mongodb+srv://eclipset:FTt2N4cmxNXgwzCW@servicify.x8nxi.mongodb.net/?retryWrites=true&w=majority&appName=servicify', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB підключено'))
  .catch(err => console.log('Помилка MongoDB:', err));

app.get('/', (req, res) => {
    res.send('Привіт, це твій додаток для СТО!');
});

app.listen(3000, () => {
    console.log('Сервер працює на http://localhost:3000');
});