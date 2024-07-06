const db = require('../database/database');

class User {
  static findOne(params) {
    const { login } = params;
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM users WHERE login = ?', [login], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }

  static create(user) {
    const { name, login, password } = user;
    return new Promise((resolve, reject) => {
      db.run('INSERT INTO users (name, login, password) VALUES (?, ?, ?)', [name, login, password], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID, ...user });
        }
      });
    });
  }

  static comparePassword(storedPassword, inputPassword) {
    return storedPassword === inputPassword;
  }
}

module.exports = User;
