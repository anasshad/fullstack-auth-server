const router = require('express').Router();
const passport = require('passport');

router
    .route('/profile')
    .get(passport.authenticate(['jwt'], {session: false}), (req, res) => {
        res.json(req.user)
    })

    module.exports = router;