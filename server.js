const http = require('http');
const path = require('path');
const express = require('express');
const exphsb = require('express-handlebars');
const app = express();

// req - запрос
// res - ответ сервера

const hbs = exphsb.create({
    defaultLayout: 'main',
    extname: 'hbs'
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.render('home', {
        title: 'Главная страница',
        isHome: true
    });
});

app.get('/support', (req, res) => {
    res.render('support', {
        title: 'Страница поддержки',
        isSupport: true
    });
});

app.get('/settings', (req, res) => {
    res.render('settings', {
        title: 'Настройки',
        isSettings: true
    });
});

app.get('/aboutUs', (req, res) => {
    res.render('aboutUs', {
        title: 'О нас',
        isAboutUs: true
    });
});

app.get('/account', (req, res) => {
    res.render('account', {
        title: 'Аккаунт',
        isAccount: true
    });
});

app.get('/library', (req, res) => {
    res.render('library', {
        title: 'Библиотека',
        isLibrary: true
    });
});

app.get('/decks', (req, res) => {
    res.render('decks', {
        title: 'Колоды',
        isDecks: true
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});


app.get('/signup', (req, res) => {
  res.render('signup', {
    title: 'Регистрация'
  });
});




 app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}.`);
 });















































































//sdfsdfsdfsdfsd


 // :) 11010000 10011000 11010000 10110001 11010000 10110000 11010001 10000010 11010001 10000011 11010000 10111011 11010000 10111000 11010000 10111101 00100000 11010000 10010101 11010000 10110001 11010000 10110000 11010000 10111101 11010000 10110000 11010001 10000010