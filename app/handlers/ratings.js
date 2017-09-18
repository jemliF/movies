const Rating = require('../models/Rating').model;
const Movie = require('../models/Movie').model;
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
                    Rating.find({movie: req.body.movie})
                        .exec({}, (err, ratings)=> {
                            if (err) {
                                res.boom.badImplementation('Error updating movie ratings');
                            } else {
                                if (ratings) {
                                    let sum = 0;
                                    ratings.forEach((rating, index)=> {
                                        sum += rating.value;
                                        if (index === ratings.length - 1) {
                                            Movie.update({_id: req.body.movie}, {rating: sum / ratings.length}, (err, affected, resp)=> {
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
                            Rating.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true}, function (err, updatedRating) {
                                if (err) {

                                    if (err.code == '11000') {
                                        res.boom.badData('Rating already exists');
                                    } else {
                                        res.boom.badImplementation('Error updating rating');
                                    }
                                } else {
                                    Rating.find({movie: req.body.movie})
                                        .exec({}, (err, ratings)=> {
                                            if (err) {
                                                res.boom.badImplementation('Error updating movie ratings');
                                            } else {
                                                if (ratings) {
                                                    let sum = 0;
                                                    ratings.forEach((rating, index)=> {
                                                        sum += rating.value;
                                                        if (index === ratings.length - 1) {
                                                            Movie.update({_id: req.body.movie}, {rating: sum / ratings.length}, (err, affected, resp)=> {
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