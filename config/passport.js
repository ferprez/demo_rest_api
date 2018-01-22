'use strict';

const jwtStrategy = require('passport-jwt').Strategy;
const extractJWT = require('passport-jwt').ExtractJwt;

const db = require('../app/models');
const config = require('../config/config');

function hookJWTStrategy(passport) {
  let options = {};

  options.secretOrKey = config.secret,
  options.jwtFromRequest = extractJWT.fromAuthHeaderAsBearerToken();
  options.igonerExpiration = false;

  passport.use(new jwtStrategy(options, function(JWTpayload, done) {
    const { email } = JWTpayload;
    db.user.find({ where: { email }})
      .then((user) => {
        if(!user){
          done(null, false);
          return;
        }
        done(null, user);
      });
  }));
}

module.exports = hookJWTStrategy;