const { Router } = require('express');
const router = Router();
const Deck = require('../models/Deck');
const authenticate = require('../middleware/authenticate');

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

module.exports = router;
