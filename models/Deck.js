// models/Deck.js
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

    // Новая функция для поиска колоды по имени пользователя и имени колоды
    static async findByUserIdAndDeckName(userId, deckName) {
        return new Promise((resolve, reject) => {
            db.get('SELECT * FROM decks WHERE userId = ? AND name = ?', [userId, deckName], (err, row) => {
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

    // Новая функция для обновления колоды
    static async update(deckId, name, cards) {
        return new Promise((resolve, reject) => {
            db.run('UPDATE decks SET name = ?, cards = ? WHERE id = ?', [name, JSON.stringify(cards), deckId], function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    // Оставшиеся функции без изменений...
    static async findAllShared() {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM shared_decks', (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    const decks = rows.map(row => ({
                        id: row.id,
                        name: row.name,
                        cards: JSON.parse(row.cards),
                        theme: row.theme,
                        direction: row.direction
                    }));
                    resolve(decks);
                }
            });
        });
    }

    static async publishToShared(deckId, theme, direction) {
        return new Promise((resolve, reject) => {
            db.get('SELECT * FROM decks WHERE id = ?', [deckId], (err, row) => {
                if (err) {
                    reject(err);
                } else if (row) {
                    db.run('INSERT INTO shared_decks (name, cards, theme, direction) VALUES (?, ?, ?, ?)', [row.name, row.cards, theme, direction], function(err) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve({ id: this.lastID, ...row, theme, direction });
                        }
                    });
                } else {
                    reject(new Error('Deck not found'));
                }
            });
        });
    }

    static async addToLibrary(userId, sharedDeckId) {
        return new Promise((resolve, reject) => {
            db.get('SELECT * FROM shared_decks WHERE id = ?', [sharedDeckId], (err, row) => {
                if (err) {
                    reject(err);
                } else if (row) {
                    db.run('INSERT INTO decks (name, cards, userId) VALUES (?, ?, ?)', [row.name, row.cards, userId], function(err) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve({ id: this.lastID, ...row, userId });
                        }
                    });
                } else {
                    reject(new Error('Shared deck not found'));
                }
            });
        });
    }

    static async cloneForUser(userId, deckId) {
        return new Promise((resolve, reject) => {
            db.get('SELECT * FROM decks WHERE id = ?', [deckId], (err, row) => {
                if (err) {
                    reject(err);
                } else if (row) {
                    db.run('INSERT INTO decks (name, cards, userId) VALUES (?, ?, ?)', [row.name, row.cards, userId], function(err) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve({ id: this.lastID, name: row.name, cards: JSON.parse(row.cards), userId });
                        }
                    });
                } else {
                    reject(new Error('Deck not found'));
                }
            });
        });
    }

    static async deleteByUserIdAndDeckId(userId, deckId) {
        return new Promise((resolve, reject) => {
            db.run('DELETE FROM decks WHERE userId = ? AND id = ?', [userId, deckId], function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }
}

module.exports = Deck;
