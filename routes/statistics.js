const { Router } = require('express');
const router = Router();
const authenticate = require('../middleware/authenticate');

router.get('/statistics', authenticate, (req, res) => {
  res.render('statistics', {
    title: 'Статистика',
    isStatistics: true,
  });
});

module.exports = router;
