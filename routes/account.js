const { Router } = require('express');
const User = require('../models/User'); // Импортируем модель пользователя
const router = Router();

router.get('/account', (req, res) => {
        title: 'Аккаунт'
        isAccount: true
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

        res.status(201).json({ message: 'Пользователь успешно зарегистрирован' });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка сервера' });
    }
});

module.exports = router;