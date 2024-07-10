// database/database.js
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./mydb.sqlite', (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Connected to DataBase.');
  }
});

db.serialize(() => {
  // Создание таблицы users
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    login TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
  )`);

  // Создание таблицы decks
  db.run(`CREATE TABLE IF NOT EXISTS decks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    cards TEXT NOT NULL,
    userId INTEGER NOT NULL,
    FOREIGN KEY (userId) REFERENCES users (id)
  )`);

  // Создание таблицы shared_decks
  db.run(`CREATE TABLE IF NOT EXISTS shared_decks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    cards TEXT NOT NULL,
    theme TEXT NOT NULL,
    direction TEXT NOT NULL
  )`);
});

module.exports = db;
