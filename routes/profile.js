const router = require('express').Router();
const passport = require('passport');

const ensureAuthenticated = require('../auth/ensureAuthenticated');

const User = require('../db/models/User');

router
    .route('/profile')
    .get(passport.authenticate(['jwt'], {session: false}), (req, res) => {
        res.json(req.user)
    })

    module.exports = router;