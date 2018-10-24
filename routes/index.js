const router = require('express').Router();

router.route('/')
    .get((req, res) => {
        res.send('HELLO WORLD');
    })

module.exports = router;