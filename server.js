const http = require('http');
const path = require('path');
const express = require('express')
const exphsb = require('express-handlebars');
const app = express();
 //req - запрос
 //res - ответ сервера

 const hbs = exphsb.create({
   defaultLayout: 'main',
   extname: 'hbs'
 })

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views');


 const PORT = process.env.PORT || 3000; 

 app.get('/', (req, res) => {
   res.render('home');
 });  

 app.get('/about', (req, res) => {
   res.render('about');
 });


 app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}.`);
 });


















































































 // :) 11010000 10011000 11010000 10110001 11010000 10110000 11010001 10000010 11010001 10000011 11010000 10111011 11010000 10111000 11010000 10111101 00100000 11010000 10010101 11010000 10110001 11010000 10110000 11010000 10111101 11010000 10110000 11010001 10000010