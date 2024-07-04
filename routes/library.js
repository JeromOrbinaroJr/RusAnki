const { Router } = require('express');
const router = Router();

// Пример данных о колодах (в реальном приложении данные будут загружаться из базы данных)
const decks = [
    {
        id: 1,
        name: 'French Capitals',
        cards: [
            { question: 'What is the capital of France?', answer: 'Paris' },
            { question: 'What is the capital of Belgium?', answer: 'Brussels' },
            { question: 'What is the capital of Belgium?', answer: 'Brussels' },
            { question: 'What is the capital of Belgium?', answer: 'Brussels' },
            { question: 'What is the capital of Belgium?', answer: 'Brussels' },
        ]
    },
    // Добавьте другие колоды здесь
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
            deck: deck
        });
    } else {
        res.status(404).send('Deck not found');
    }
});

module.exports = router;

