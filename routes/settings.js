const {Router} = require('express');
const router = Router();

router.get('/settings', (req, res) => {
    res.render('settings', {
        title: 'Настройки',
        isSettings: true
    });
})

module.exports = router;