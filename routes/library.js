// routes/library.js
const { Router } = require('express');
const router = Router();
const Deck = require('../models/Deck');
const authenticate = require('../middleware/authenticate');

// Маршрут для отображения библиотеки пользователя
router.get('/library', authenticate, async (req, res) => {
    try {
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

// Маршрут для отображения конкретной колоды
router.get('/library/deck/:id', authenticate, async (req, res) => {
    const deckId = parseInt(req.params.id, 10);
    try {
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

// Маршрут для публикации колоды в общий репозиторий
router.post('/library/publish/:id', authenticate, async (req, res) => {
    const deckId = parseInt(req.params.id, 10);
    const { theme, direction } = req.body;

    try {
        const publishedDeck = await Deck.publishToShared(deckId, theme, direction);
        res.redirect('/shared-repository');
    } catch (error) {
        console.error('Error publishing deck:', error);
        res.status(500).send('Error publishing deck');
    }
});

// Маршрут для удаления колоды пользователя
router.delete('/library/delete/:id', authenticate, async (req, res) => {
    const deckId = parseInt(req.params.id, 10);

    try {
        await Deck.deleteByUserIdAndDeckId(req.session.user.id, deckId);
        res.status(200).send('Deck deleted');
    } catch (error) {
        console.error('Error deleting deck:', error);
        res.status(500).send('Error deleting deck');
    }
});

// Маршрут для добавления колоды по ссылке
router.get('/library/add/:id', authenticate, async (req, res) => {
    const deckId = parseInt(req.params.id, 10);

    try {
        const newDeck = await Deck.cloneForUser(req.session.user.id, deckId);
        res.redirect('/library');
    } catch (error) {
        console.error('Error adding deck:', error);
        res.status(500).send('Error adding deck');
    }
});

router.get('/library/edit/:id', authenticate, async (req, res) => {
    const deckId = parseInt(req.params.id, 10);
    try {
        const deck = await Deck.findByUserIdAndDeckId(req.session.user.id, deckId);

        if (deck) {
            res.render('deck-edit', {
                title: 'Редактирование колоды',
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

router.post('/library/save-deck', authenticate, async (req, res) => {
    const { deckName, cards } = req.body;

    try {
        // Поиск существующей колоды пользователя по имени колоды
        let deck = await Deck.findByUserIdAndDeckName(req.session.user.id, deckName);

        if (deck) {
            // Обновление карточек в колоде
            deck.cards = cards;
            await Deck.update(deck.id, deckName, cards);

            res.status(200).send('Deck saved successfully');
        } else {
            res.status(404).send('Deck not found');
        }
    } catch (error) {
        console.error('Error saving deck:', error);
        res.status(500).send('Error saving deck');
    }
});

module.exports = router;
