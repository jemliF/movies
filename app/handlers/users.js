/**
 * @author Fathi Jemli <jemlifathi2013@gmail.com>
 */
const Joi = require('joi');
const jwt = require('jsonwebtoken');

const User = require('../models/User').model;
const UserValidation = require('../../utils/validation').User;
const hooks = require('../../utils/hooks');
/**
 * User login
 * @memberof users
 * @function
 * @param {Object} req - An HTTP request.
 * @param {Object} res - An HTTP response.
 */
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
/**
 * User signup
 * @memberof users
 * @function
 * @param {Object} req - An HTTP request.
 * @param {Object} res - An HTTP response.
 */
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
/**
 * Get a single user
 * @memberof users
 * @function
 * @param {Object} req - An HTTP request.
 * @param {Object} res - An HTTP response.
 */
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
/**
 * Update a single user
 * @memberof users
 * @function
 * @param {Object} req - An HTTP request.
 * @param {Object} res - An HTTP response.
 */
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
                            value.updatedAt = new Date();
                            User.findByIdAndUpdate(req.params.id, {$set: value}, {new: true}, function (err, updatedUser) {
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