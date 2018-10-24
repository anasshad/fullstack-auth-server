const passport = require('passport');
const passportJwt = require('passport-jwt');
const jwt = require('jsonwebtoken');

//import passport strategies
const PassportStrategy = require('passport-jwt').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
// const FacebookTokenStrategy = require('passport-facebook-token');

//Import the User model
const User = require('../db/models/User');

const config = require('./config');

//Using Passport-Facebook
passport.use(new FacebookStrategy(config.facebookAuth, function (accessToken, refreshToken, profile, done) {
  console.log(profile, accessToken);
  User
    .findOne({
      oauthID: profile.id
    }, function (err, user) {
      if (err) {
        console.log(err);
      }
      if (!err && user !== null) {
        done(null, {...user, token: accessToken})
      } else {
        user = new User({
          oauthID: profile.id,
          name: `${profile._json.first_name} ${profile._json.last_name}`,
          created: Date.now()
        });
        user.save(function (err) {
          if (err) {
            console.log(err);
          } else {
            console.log('...saving user');
            done(null, {...user, token: accessToken});
          }
        })
      }
    })
}));

const jwtOptions = {
  jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderWithScheme('jwt'),
  secretOrKey: 'superSecretKey',
  issuer: 'fullStackAuthApp',
  audience: 'fullStackAuthApp'
}

//Using Passport JWT
passport.use(new PassportStrategy(jwtOptions, (payload, done) => {
  console.log('INSIE JWT STRATEGY', payload)
  User
    .findOne({
      oauthID: parseInt(payload.sub)
    }, function (err, user) {
      //Error
      if (err) {
        console.log(err);
        return done();
      }
      //No Error and user found
      if (!err && user !== null) {
        return done(null, user, payload);
      } 
    })
}))