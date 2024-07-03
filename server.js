const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const path = require('path');

// Подключение к маршрутам
const homeRoutes = require('./routes/home');
const accountRoutes = require('./routes/account');
const supportRoutes = require('./routes/support');
const settingsRoutes = require('./routes/settings');
const decksRoutes = require('./routes/decks');
const libraryRoutes = require('./routes/library');
const aboutUsRoutes = require('./routes/aboutUs');
const ibaRoutes = require('./routes/iba');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware для обработки данных форм
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Настройка Handlebars
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Статические файлы
app.use(express.static('public'));

// Подключение к MongoDB
const db = 'mongodb+srv://Denis:JeromOrbinaroJr227@rusanki.g7zcdqv.mongodb.net/?retryWrites=true&w=majority&appName=RusAnki';
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.log(error));

// Подключение маршрутов
app.use(homeRoutes);
app.use(accountRoutes);
app.use(supportRoutes);
app.use(settingsRoutes);
app.use(decksRoutes);
app.use(libraryRoutes);
app.use(aboutUsRoutes);
app.use(ibaRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
