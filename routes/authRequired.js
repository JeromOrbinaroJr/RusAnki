const { Router } = require('express');
const router = Router();

router.get('/auth-required', (req, res) => {
  res.render('auth-required', {
    title: 'Требуется аутентификация'
  });
});

module.exports = router;
