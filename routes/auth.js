const router = require('express').Router();
const passport = require('passport');
const generateAccessToken =  require('../auth/generateAccessToken');

const CLIENT_URL = require('../client_url');

router
    .route('/auth/facebook')
    .get(passport.authenticate('facebook'));

router
    .route('/auth/facebook/callback')
    .get(passport.authenticate('facebook', {failureRedirect: '/login', session: false}), 
    (req, res) => {
        const accessToken = generateAccessToken(req.user._doc.oauthID);
        res.redirect(CLIENT_URL + "/token/" + accessToken);
    }
    );

router
    .route('/auth/logout')
    .get((req, res) => {
        req.logout();
        res.json({message: 'Logout Success'});
    })

module.exports = router;