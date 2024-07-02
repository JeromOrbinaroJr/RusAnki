const {Router} = require('express');
const router = Router();

router.get('/iba', (req, res) => {
    res.render('iba');
})

module.exports = router;
