const passport = require('passport');
const User = require('../app/models/User').model;
const BasicStrategy = require('passport-http').BasicStrategy;


passport.use('user', new BasicStrategy((email, password, next) => {
        User.findOne({email: email}, (err, user) => {
            if (err) {
                return next(err);
            } else if (!user) {
                return next(null, false);
            } else (user.comparePasswords(password, (err, isMatch) => {
                if (err) {
                    return next(null, false);
                } else if (isMatch) {
                    return next(null, user);
                } else {
                    return next(null, false);
                }
            }));
        });
    }
));