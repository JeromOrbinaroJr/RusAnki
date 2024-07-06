const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const session = require('express-session');

const homeRoutes = require('./routes/home');
const accountRoutes = require('./routes/account');
const supportRoutes = require('./routes/support');
const statisticsRoutes = require('./routes/statistics');
const decksRoutes = require('./routes/decks');
const libraryRoutes = require('./routes/library');
const aboutUsRoutes = require('./routes/aboutUs');
const ibaRoutes = require('./routes/iba');
const profileRoutes = require('./routes/profile');
const authRequiredRoutes = require('./routes/authRequired');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: false,
}));

const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs',
  partialsDir: path.join(__dirname, 'views', 'partials')
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));

const PORT = process.env.PORT || 3000;

app.use(homeRoutes);
app.use(accountRoutes);
app.use(ibaRoutes);
app.use(statisticsRoutes);
app.use(decksRoutes);
app.use(libraryRoutes);
app.use(aboutUsRoutes);
app.use(supportRoutes);
app.use(profileRoutes);
app.use(authRequiredRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
