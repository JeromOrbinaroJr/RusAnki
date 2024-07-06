const { Router } = require('express');
const router = Router();
const Deck = require('../models/Deck'); // Подключите модель Deck

// Middleware для проверки аутентификации
function authenticate(req, res, next) {
  if (req.session.user) {
    next(); // Продолжить выполнение, если пользователь аутентифицирован
  } else {
    res.redirect('/account'); // Иначе перенаправить на страницу входа/регистрации
  }
}

// Защита маршрутов с использованием middleware authenticate
router.get('/decks', authenticate, (req, res) => {
  res.render('decks', {
    title: 'Колоды',
    isDecks: true
  });
});

// Обработчик POST запроса на создание колоды
router.post('/createDeck', authenticate, async (req, res) => {
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
    console.error('Ошибка при создании колоды:', error);
    res.status(500).json({ success: false, message: 'Ошибка при создании колоды' });
  }
});

module.exports = router;
