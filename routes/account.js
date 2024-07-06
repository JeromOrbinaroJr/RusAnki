const { Router } = require('express');
const User = require('../models/User');
const router = Router();

router.get('/account', (req, res) => {
  const user = req.session.user;
  res.render('account', {
    title: 'Аккаунт',
    isAccount: true,
    isLoggedIn: !!user,
    user,
  });
});

router.post('/account/register', async (req, res) => {
  const { name, login, password } = req.body;

  if (!name || !login || !password) {
    return res.status(400).json({ message: 'Все поля обязательны для заполнения' });
  }

  try {
    const existingUser = await User.findOne({ login });
    if (existingUser) {
      return res.status(400).json({ message: 'Пользователь с таким логином уже существует' });
    }

    const newUser = await User.create({ name, login, password });
    req.session.isLoggedIn = true;
    req.session.user = newUser;

    res.redirect('/profile');
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

router.post('/account/login', async (req, res) => {
  const { login, password } = req.body;

  if (!login || !password) {
    return res.status(400).json({ message: 'Все поля обязательны для заполнения' });
  }

  try {
    const user = await User.findOne({ login });
    if (!user) {
      return res.status(400).json({ message: 'Неверный логин или пароль' });
    }

    const isMatch = User.comparePassword(user.password, password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Неверный логин или пароль' });
    }

    req.session.isLoggedIn = true;
    req.session.user = user;

    res.redirect('/profile');
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

router.post('/account/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/account');
  });
});

router.post('/account/delete', async (req, res) => {
  const userId = req.session.user.id;

  try {
    await User.destroy({ where: { id: userId } });
    req.session.destroy(() => {
      res.redirect('/account');
    });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

module.exports = router;
