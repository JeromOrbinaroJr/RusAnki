const db = require('../database/database');

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

    static async findAllByUserId(userId) {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM decks WHERE userId = ?', [userId], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    const decks = rows.map(row => ({
                        id: row.id,
                        name: row.name,
                        cards: JSON.parse(row.cards)
                    }));
                    resolve(decks);
                }
            });
        });
    }

    static async findByUserIdAndDeckId(userId, deckId) {
        return new Promise((resolve, reject) => {
            db.get('SELECT * FROM decks WHERE userId = ? AND id = ?', [userId, deckId], (err, row) => {
                if (err) {
                    reject(err);
                } else if (row) {
                    const deck = {
                        id: row.id,
                        name: row.name,
                        cards: JSON.parse(row.cards)
                    };
                    resolve(deck);
                } else {
                    resolve(null);
                }
            });
        });
    }
}

module.exports = Deck;
