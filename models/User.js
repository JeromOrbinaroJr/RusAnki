const bcrypt = require('bcrypt');
const db = require('../database/database');

class User {
  static async findOne(params) {
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

  static async create(user) {
    const { name, login, password } = user;
    const hashedPassword = await bcrypt.hash(password, 10); // Хешируем пароль

    return new Promise((resolve, reject) => {
      db.run('INSERT INTO users (name, login, password) VALUES (?, ?, ?)', [name, login, hashedPassword], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID, name, login });
        }
      });
    });
  }

  static async comparePassword(storedPassword, inputPassword) {
    return await bcrypt.compare(inputPassword, storedPassword); // Сравниваем хеши паролей
  }
}

module.exports = User;
