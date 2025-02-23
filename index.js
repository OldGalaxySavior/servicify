const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

// Підключення до локального MongoDB
mongoose.connect(process.env.MONGODB_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB підключено'))
  .catch(err => console.log('Помилка MongoDB:', err));

app.get('/', (req, res) => {
    res.send('Привіт, це твій додаток для СТО!');
});

app.listen(process.env.PORT || 3000, () => {
    console.log('Сервер працює online');
});