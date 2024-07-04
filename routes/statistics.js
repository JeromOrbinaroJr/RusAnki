const { Router } = require('express');
const router = Router();

router.get('/statistics', (req, res) => {
    res.render('statistics', {
        title: 'Статистика',
        isStatistics: true,
    });
});

module.exports = router;
