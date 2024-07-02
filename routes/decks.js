const {Router} = require('express');
const router = Router();

router.get('/decks', (req, res) => {
    res.render('decks', {
        title: 'Колоды',
        isDecks: true
    });
});

module.exports = router;