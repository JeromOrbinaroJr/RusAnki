const { Router } = require('express');
const User = require('../models/User'); // Импортируем модель пользователя
const router = Router();

router.get('/account', (req, res) => {
    res.render('account', {
        title: 'Аккаунт',
        isAccount: true,
    });
});

router.post('/account/register', async (req, res) => {
    const { name, login, password } = req.body;

    // Валидация данных
    if (!name || !login || !password) {
        return res.status(400).json({ message: 'Все поля обязательны для заполнения' });
    }

    try {
        // Проверка на существование пользователя
        const existingUser = await User.findOne({ login });
        if (existingUser) {
            return res.status(400).json({ message: 'Пользователь с таким логином уже существует' });
        }

        // Создание нового пользователя
        const newUser = new User({ name, login, password });
        await newUser.save();

        req.session.isLoggedIn = true;
        req.session.user = newUser;

        res.status(201).json({ message: 'Пользователь успешно зарегистрирован' });
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

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Неверный логин или пароль' });
        }

        req.session.isLoggedIn = true;
        req.session.user = user;

        res.status(200).json({ message: 'Вы успешно вошли в систему' });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка сервера' });
    }
});

router.post('/account/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/account');
    });
});

module.exports = router;
