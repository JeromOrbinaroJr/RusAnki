const {Router} = require('express');
const router = Router();

router.get('/aboutUs', (req, res) => {
    res.render('aboutUs', {
        title: 'О нас',
        isAboutUs: true
    });
});

module.exports = router;