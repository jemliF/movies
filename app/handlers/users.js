/**
 * @author Fathi Jemli <jemlifathi2013@gmail.com>
 */
const Joi = require('joi');
const jwt = require('jsonwebtoken');

const User = require('../models/User').model;
const UserValidation = require('../../utils/validation').User;
const hooks = require('../../utils/hooks');

exports.login = (req, res) => {
    if (req.body.email && req.body.password) {
        User.findOne({email: req.body.email})
            .exec({}, (err, user) => {
                if (err) {
                    res.boom.badImplementation('Error logging in user');
                } else {
                    if (user) {
                        user.comparePasswords(req.body.password, (err, isMatch) => {
                            if (err) {
                                res.boom.badImplementation('Error logging in user');
                            } else {
                                if (isMatch) {
                                    let token = jwt.sign({
                                        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24),
                                        user
                                    }, process.env.JWT_SECRET);
                                    res.status(200).json({
                                        token
                                    });
                                } else {
                                    res.boom.forbidden('Bad credentials');
                                }
                            }
                        })
                    } else {
                        res.boom.notFound('Error retrieving user ' + req.body.email);
                    }
                }
            });
    } else {
        res.boom.badData('Missing credentials');
    }
};

exports.signup = (req, res) => {
    Joi.validate(req.body, UserValidation, (err, value) => {
        if (err) {
            res.boom.badData(hooks.prettifyValidationErrors(err.details));
        } else {
            let newUser = new User(value);
            newUser.save((err) => {
                if (err) {
                    if (err.code == '11000') {
                        res.boom.badData('User \'' + value.email + '\' already exists');
                    } else {
                        res.boom.badImplementation('Error saving user');
                    }
                } else {
                    res.status(200).end();
                }
            });
        }
    });
};

exports.get = (req, res) => {
    User.findOne({_id: req.params.id})
        .exec({}, (err, user) => {
            if (err) {
                res.boom.badImplementation('Error finding user');
            } else {
                if (user) {
                    res.json(user);
                } else {
                    res.boom.notFound('Unable to identify user ', req.params.id);
                }
            }
        });
};

exports.update = (req, res) => {
    User.findOne({_id: req.params.id})
        .exec({}, (err, user) => {
            if (err) {
                res.boom.badImplementation('Error identifying user');
            } else {
                if (user) {
                    Joi.validate(req.body, UserValidation, (err, value) => {
                        if (err) {
                            res.boom.badData(hooks.prettifyValidationErrors(err.details));
                        } else {
                            User.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true}, function (err, updatedUser) {
                                if (err) {
                                    if (err.code == '11000') {
                                        res.boom.badData('User \'' + value.email + '\' already exists');
                                    } else {
                                        res.boom.badImplementation('Error updating user');
                                    }
                                } else {
                                    res.json(updatedUser);
                                }
                            });
                        }
                    });
                } else {
                    res.boom.notFound('Unable to identify user ', req.params.id);
                }
            }
        });
};