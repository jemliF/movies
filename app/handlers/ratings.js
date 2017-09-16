const Rating = require('../models/Rating').model;
const RatingValidation = require('../../utils/validation').Rating;
const Joi = require('joi');
const hooks = require('../../utils/hooks');

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
                    res.json(newRating);
                }
            });
        }
    });
};

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

exports.getAll = (req, res) => {
    let request = {};
    req.query.movie ? request.movie = req.query.movie : null;
    req.query.user ? request.user = req.query.user : null;
    console.log(request);
    Rating.find(request)
        .populate('movie')
        .populate('user', '-password')
        .exec({}, (err, ratings) => {
            if (err) {
                console.error(err);
                res.boom.badImplementation('Error finding ratings');
            } else {
                req.query.total ? res.json(ratings.length || 0) : res.json(ratings || []);
                /*if (req.query.count) {
                    result.count = ratings.count;
                }
                if (req.query.items) {
                    result.items = ratings;
                }
                if (req.query.total) {
                    let sum = 0;
                    ratings.forEach(function (rating, index) {
                        sum += rating.value;
                        if (index === ratings.length - 1) {
                            result.total = sum / ratings.length;
                            res.json(result);
                        }
                    });
                } else {
                    res.json(result);
                }*/
            }
        });
};

exports.update = (req, res) => {
    Rating.findOne({_id: req.params.id})
        .exec({}, (err, rating) => {
            if (err) {
                console.error(err);
                res.boom.badImplementation('Error identifying rating');
            } else {
                if (rating) {
                    Joi.validate(req.body, RatingValidation, (err, value) => {
                        if (err) {
                            console.error(err);
                            res.boom.badData(hooks.prettifyValidationErrors(err.details));
                        } else {
                            Rating.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true}, function (err, updatedRating) {
                                if (err) {
                                    console.error(err);
                                    if (err.code == '11000') {
                                        res.boom.badData('Rating already exists');
                                    } else {
                                        res.boom.badImplementation('Error updating rating');
                                    }
                                } else {
                                    res.json(updatedRating);
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

exports.delete = (req, res) => {
    Rating.findOne({_id: req.params.id})
        .exec({}, (err, rating) => {
            if (err) {
                res.boom.badImplementation('Error identifying rating');
            } else {
                if (rating) {
                    Rating.remove({_id: req.params.id}, function (err) {
                        if (err) {
                            res.boom.badImplementation('Error updating rating');
                        } else {
                            res.status(200).end('Rating deleted successfully');
                        }
                    });
                } else {
                    res.boom.notFound('Unable to identify rating ', req.params.id);
                }
            }
        });
};