// routes/sharedRepository.js
const { Router } = require('express');
const router = Router();
const Deck = require('../models/Deck');
const authenticate = require('../middleware/authenticate');

router.get('/shared-repository', async (req, res) => {
    try {
        const decks = await Deck.findAllShared();
        res.render('sharedRepository', {
            title: 'Общий Репозиторий',
            isSharedRepository: true,
            decks: decks
        });
    } catch (error) {
        console.error('Error loading shared decks:', error);
        res.status(500).send('Error loading shared decks');
    }
});

router.post('/shared-repository/publish', authenticate, async (req, res) => {
    const { name, cards, theme, direction } = req.body;
    const deck = { name, cards, theme, direction };
    try {
        await Deck.publish(deck);
        res.redirect('/shared-repository');
    } catch (error) {
        console.error('Error publishing deck:', error);
        res.status(500).send('Error publishing deck');
    }
});

router.post('/shared-repository/add-to-library/:id', authenticate, async (req, res) => {
    const sharedDeckId = parseInt(req.params.id, 10);

    try {
        const addedDeck = await Deck.addToLibrary(req.session.user.id, sharedDeckId);
        res.redirect('/library');
    } catch (error) {
        console.error('Error adding shared deck to library:', error);
        res.status(500).send('Error adding shared deck to library');
    }
});

router.post('/shared-repository/add/:id', authenticate, async (req, res) => {
  const sharedDeckId = parseInt(req.params.id, 10);

  try {
      const addedDeck = await Deck.addToLibrary(req.session.user.id, sharedDeckId);
      res.redirect('/library');
  } catch (error) {
      console.error('Error adding shared deck to library:', error);
      res.status(500).send('Error adding shared deck to library');
  }
});


module.exports = router;
