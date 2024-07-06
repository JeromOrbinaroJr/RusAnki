const { Router } = require('express');
const router = Router();
const Deck = require('../models/Deck');
const authenticate = require('../middleware/authenticate');

router.get('/decks', authenticate, (req, res) => {
  res.render('decks', {
    title: 'Колоды',
    isDecks: true
  });
});

router.post('/createDeck', authenticate, async (req, res) => {
  const { deckName, flashcards } = req.body;
  const userId = req.session.user.id;

  try {
    const newDeck = await Deck.create({
      name: deckName,
      cards: flashcards,
      userId: userId
    });

    res.json({ success: true });
  } catch (error) {
    console.error('Ошибка при создании колоды:', error);
    res.status(500).json({ success: false, message: 'Ошибка при создании колоды' });
  }
});

module.exports = router;
