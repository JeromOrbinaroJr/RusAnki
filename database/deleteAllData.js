const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./mydb.sqlite', (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

db.serialize(() => {
  db.run('DELETE FROM users', (err) => {
    if (err) {
      console.error('Error clearing users table:', err.message);
    } else {
      console.log('Users table cleared.');
    }
  });

  db.run('DELETE FROM decks', (err) => {
    if (err) {
      console.error('Error clearing decks table:', err.message);
    } else {
      console.log('Decks table cleared.');
    }
  });
});

db.close((err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Closed the database connection.');
  }
});
