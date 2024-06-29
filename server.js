const http = require('http');
const express = require('express')

 //req - запрос
 //res - ответ сервера

 const app = express();
 const PORT = process.env.PORT || 3000; 

 app.get(PORT, (req, res) => {
   res.send('RusAnki!');
 });

 app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}.`);
 });