const {Router} = require('express');
const router = Router();

router.get('/support', (req, res) => {
    res.render('support', {
        title: 'Страница поддержки',
        isSupport: true
    });
})

module.exports = router;