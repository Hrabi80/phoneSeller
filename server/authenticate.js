var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/user');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var jwt = require('jsonwebtoken'); // generate token 
var FacebookTokenStrategy = require('passport-facebook-token');



var config = require('./config.js');

passport.use(new LocalStrategy(User.authenticate())); // auth() by passport - local -mongoose instead of write it by yourself 
passport.serializeUser(User.serializeUser());  // to be stored 
passport.deserializeUser(User.deserializeUser()); // to extract information when request comes to the server

exports.getToken = function(user) {
    return jwt.sign(user, config.secretKey,
        {expiresIn: 7600});
};

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretKey;

exports.jwtPassport = passport.use(new JwtStrategy(opts,
    (jwt_payload, done) => {
        console.log("JWT payload: ", jwt_payload);
        User.findOne({_id: jwt_payload._id}, (err, user) => {
            if (err) {
                return done(err, false);
            }
            else if (user) {
                return done(null, user);
            }
            else {
                return done(null, false);
            }
        });
    }));

//verify an income user and authenticate it based on token
exports.verifyUser = passport.authenticate('jwt',{session: false});

exports.verifyAdmin = function(req,res,next){
    console.log("here",req.user.admin);
    if (!req.user.admin) {
        var error  = new Error('You do not have admin privileges!');
        error.status = 401;
        return next(error);
    }
    else{
        next();
    }   
  };

  exports.facebookPassport = passport.use(new FacebookTokenStrategy({
    clientID: config.facebook.clientId,
    clientSecret: config.facebook.clientSecret
}, (accessToken, refreshToken, profile, done) => {
    User.findOne({facebookId: profile.id}, (err, user) => {
        if (err) {
            return done(err, false);
        }
        if (!err && user !== null) {
            return done(null, user);
        }
        else {
            user = new User({ username: profile.displayName });
            user.facebookId = profile.id;
            user.firstname = profile.name.givenName;
            user.lastname = profile.name.familyName;
            user.save((err, user) => {
                if (err)
                    return done(err, false);
                else
                    return done(null, user);
            })
        }
    });
}
));