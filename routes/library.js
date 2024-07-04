const { Router } = require('express');
const router = Router();

// Пример данных о колодах (в реальном приложении данные будут загружаться из базы данных)
const decks = [
    {
        id: 1,
        name: 'French Capitals',
        cards: [
            { question: 'Я убью себя когда', answer: 'Paris' },
            { question: 'Выпадет снег', answer: 'Brussels' },
            { question: 'Андрей Замай мне сказал что единого нет', answer: 'Berlin' },
            { question: 'И я убью себя', answer: 'Madrid' },
            { question: 'Чтобы было плохо тебе', answer: 'Rome' },
            { question: 'Скажу загнался по хуйне', answer: 'Rome' },
            { question: 'Похуй я мёртвый поэт', answer: 'Rome' }
        ]
    }
];

router.get('/library', (req, res) => {
    res.render('library', {
        title: 'Библиотека',
        isLibrary: true,
        decks: decks
    });
});

router.get('/library/deck/:id', (req, res) => {
    const deckId = parseInt(req.params.id, 10);
    const deck = decks.find(d => d.id === deckId);

    if (deck) {
        res.render('deck', {
            title: deck.name,
            deck: deck,
            deckData: JSON.stringify(deck)
        });
    } else {
        res.status(404).send('Deck not found');
    }
});

module.exports = router;

