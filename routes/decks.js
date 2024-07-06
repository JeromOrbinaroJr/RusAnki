const {Router} = require('express');
const router = Router();
const Deck = require('../models/Deck'); // Создайте модель Deck

router.get('/decks', (req, res) => {
    res.render('decks', {
        title: 'Колоды',
        isDecks: true
    });
});


// Обработчик POST запроса на создание колоды
router.post('/createDeck', async (req, res) => {
  const { deckName, flashcards } = req.body;
  const userId = req.session.user.id; // Получаем ID пользователя из сессии

  try {
    // Создание новой колоды в базе данных
    const newDeck = await Deck.create({
      name: deckName,
      cards: flashcards,
      userId: userId // Связываем колоду с пользователем
    });

    res.json({ success: true });
  } catch (error) {
    console.error('Error creating deck:', error);
    res.status(500).json({ success: false, message: 'Error creating deck' });
  }
});

module.exports = router;