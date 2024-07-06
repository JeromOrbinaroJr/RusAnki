const { Router } = require('express');
const router = Router();

router.get('/profile', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/account');
  }
  const user = req.session.user;
  res.render('profile', {
    title: 'Профиль пользователя',
    user,
  });
});

module.exports = router;
