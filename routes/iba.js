const {Router} = require('express');
const router = Router();

router.get('/iba', (req, res) => {
    res.render('iba', {
        title: 'Секретик)',
        isIba: true
    });
})

module.exports = router;
