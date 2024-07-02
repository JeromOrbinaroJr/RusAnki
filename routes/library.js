const {Router} = require('express');
const router = Router();

router.get('/library', (req, res) => {
    res.render('library', {
        title: 'Библиотека',
        isLibrary: true
    });
});

module.exports = router;


