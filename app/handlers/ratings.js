/**
 * @author Fathi Jemli <jemlifathi2013@gmail.com>
 */
const Rating = require('../models/Rating').model;
const Movie = require('../models/Movie').model;
const RatingValidation = require('../../utils/validation').Rating;
const Joi = require('joi');
const hooks = require('../../utils/hooks');
/**
 * Create a rating
 * @memberof ratings
 * @function
 * @param {Object} req - An HTTP request.
 * @param {Object} res - An HTTP response.
 */
exports.create = (req, res) => {
    Joi.validate(req.body, RatingValidation, (err, value) => {
        if (err) {
            res.boom.badData(JSON.stringify(hooks.prettifyValidationErrors(err.details)));
        } else {
            let newRating = new Rating(value);
            newRating.save((err) => {
                if (err) {
                    if (err.code == '11000') {
                        res.boom.badData('Rating already exists');
                    } else {
                        res.boom.badImplementation('Error saving rating');
                    }
                } else {
                    Rating.find({movie: req.body.movie})
                        .exec({}, (err, ratings) => {
                            if (err) {
                                res.boom.badImplementation('Error updating movie ratings');
                            } else {
                                if (ratings) {
                                    let sum = 0;
                                    ratings.forEach((rating, index) => {
                                        sum += rating.value;
                                        if (index === ratings.length - 1) {
                                            Movie.update({_id: req.body.movie}, {rating: sum / ratings.length}, (err, affected, resp) => {
                                                if (err) {
                                                    res.boom.badImplementation('Error updating movie ratings');
                                                } else {
                                                    Rating
                                                        .populate(newRating, 'user movie', (err, rating) => {
                                                            res.json(newRating);
                                                        });
                                                }
                                            });
                                        }
                                    });
                                }
                            }
                        });
                }
            });
        }
    });
};
/**
 * Get a rating
 * @memberof ratings
 * @function
 * @param {Object} req - An HTTP request.
 * @param {Object} res - An HTTP response.
 */
exports.get = (req, res) => {
    Rating.findOne({_id: req.params.id})
        .exec({}, (err, rating) => {
            if (err) {
                res.boom.badImplementation('Error finding rating');
            } else {
                if (rating) {
                    res.json(rating);
                } else {
                    res.boom.notFound('Unable to identify rating ', req.params.id);
                }
            }
        });
};
/**
 * Get ratings
 * @memberof ratings
 * @function
 * @param {Object} req - An HTTP request.
 * @param {Object} res - An HTTP response.
 */
exports.getAll = (req, res) => {
    let request = {};
    req.query.movie ? request.movie = req.query.movie : null;
    req.query.user ? request.user = req.query.user : null;

    Rating.find(request)
        .populate('movie')
        .populate('user', '-password')
        .exec({}, (err, ratings) => {
            if (err) {

                res.boom.badImplementation('Error finding ratings');
            } else {
                res.json(ratings || []);
            }
        });
};
/**
 * Update a rating
 * @memberof ratings
 * @function
 * @param {Object} req - An HTTP request.
 * @param {Object} res - An HTTP response.
 */
exports.update = (req, res) => {
    Rating.findOne({_id: req.params.id})
        .exec({}, (err, rating) => {
            if (err) {

                res.boom.badImplementation('Error identifying rating');
            } else {
                if (rating) {
                    Joi.validate(req.body, RatingValidation, (err, value) => {
                        if (err) {

                            res.boom.badData(hooks.prettifyValidationErrors(err.details));
                        } else {
                            value.updatedAt = new Date();
                            Rating.findByIdAndUpdate(req.params.id, {$set: value}, {new: true}, function (err, updatedRating) {
                                if (err) {

                                    if (err.code == '11000') {
                                        res.boom.badData('Rating already exists');
                                    } else {
                                        res.boom.badImplementation('Error updating rating');
                                    }
                                } else {
                                    Rating.find({movie: req.body.movie})
                                        .exec({}, (err, ratings) => {
                                            if (err) {
                                                res.boom.badImplementation('Error updating movie ratings');
                                            } else {
                                                if (ratings) {
                                                    let sum = 0;
                                                    ratings.forEach((rating, index) => {
                                                        sum += rating.value;
                                                        if (index === ratings.length - 1) {
                                                            Movie.update({_id: req.body.movie}, {rating: sum / ratings.length}, (err, affected, resp) => {
                                                                if (err) {
                                                                    res.boom.badImplementation('Error updating movie ratings');
                                                                } else {
                                                                    Rating
                                                                        .populate(updatedRating, 'user movie', (err, rating) => {
                                                                            res.json(updatedRating);
                                                                        });
                                                                }
                                                            });
                                                        }
                                                    });
                                                }
                                            }
                                        });
                                }
                            });
                        }
                    });
                } else {
                    res.boom.notFound('Unable to identify rating ', req.params.id);
                }
            }
        });
};