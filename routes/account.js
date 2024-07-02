const {Router} = require('express');
const router = Router();

router.get('/account', (req, res) => {
    res.render('account', {
        title: 'Аккаунт',
        isAccount: true
    });
})

module.exports = router;