const { Router } = require('express');
const router = Router();
const Deck = require('../models/Deck'); // Импортируем модель Deck

// GET /library - отображение библиотеки пользователя
router.get('/library', async (req, res) => {
    try {
        // Загрузка колод из базы данных, принадлежащих текущему пользователю
        const decks = await Deck.findAllByUserId(req.session.user.id);

        res.render('library', {
            title: 'Библиотека',
            isLibrary: true,
            decks: decks
        });
    } catch (error) {
        console.error('Error loading user decks:', error);
        res.status(500).send('Error loading user decks');
    }
});

// GET /library/deck/:id - просмотр конкретной колоды
router.get('/library/deck/:id', async (req, res) => {
    const deckId = parseInt(req.params.id, 10);
    try {
        // Загрузка конкретной колоды из базы данных
        const deck = await Deck.findByUserIdAndDeckId(req.session.user.id, deckId);

        if (deck) {
            res.render('deck', {
                title: deck.name,
                deck: deck,
                deckData: JSON.stringify(deck)
            });
        } else {
            res.status(404).send('Deck not found');
        }
    } catch (error) {
        console.error('Error loading deck:', error);
        res.status(500).send('Error loading deck');
    }
});

module.exports = router;
