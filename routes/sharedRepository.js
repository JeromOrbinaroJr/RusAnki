const { Router } = require('express');
const router = Router();
const Deck = require('../models/Deck');

router.get('/shared-repository', async (req, res) => {
  try {
    const decks = await Deck.findAllShared();
    console.log('Rendering shared repository with decks:', decks);
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

module.exports = router;
