const http = require('http');
const path = require('path');
const homeRoutes = require('./routes/home');
const accountRoutes = require('./routes/account');
const supportRoutes = require('./routes/support');
const settingsRoutes = require('./routes/settings');
const decksRoutes = require('./routes/decks');
const libraryRoutes = require('./routes/library');
const aboutUsRoutes = require('./routes/aboutUs');
const ibaRoutes = require('./routes/iba')
const express = require('express');
const exphsb = require('express-handlebars');
const mysql = require('mysql2');
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







 
// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  pass: 123,
  database: 'test'
});
 
// simple query
connection.query(
  'SELECT * FROM `table',
  function(err, results, fields) {
    console.log(results); // results contains rows returned by server
    console.log(fields); // fields contains extra meta data about results, if available
  }
);







































































 // :) 11010000 10011000 11010000 10110001 11010000 10110000 11010001 10000010 11010001 10000011 11010000 10111011 11010000 10111000 11010000 10111101 00100000 11010000 10010101 11010000 10110001 11010000 10110000 11010000 10111101 11010000 10110000 11010001 10000010