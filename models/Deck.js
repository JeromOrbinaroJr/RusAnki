const db = require('../database');

class Deck {
  static create(deck) {
    const { name, cards, userId } = deck;
    return new Promise((resolve, reject) => {
      db.run('INSERT INTO decks (name, cards, userId) VALUES (?, ?, ?)', [name, JSON.stringify(cards), userId], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID, ...deck });
        }
      });
    });
  }

  // Другие методы, например, для получения всех колод пользователя и т.д.
}

module.exports = Deck;
