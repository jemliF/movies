const Movie = require('../models/Movie').model;
const Rating = require('../models/Rating').model;
const MovieValidation = require('../../utils/validation').Movie;
const Joi = require('joi');
const hooks = require('../../utils/hooks');

exports.create = (req, res) => {
    Joi.validate(req.body, MovieValidation, (err, value) => {
        if (err) {
            res.boom.badData(JSON.stringify(hooks.prettifyValidationErrors(err.details)));
        } else {
            let newMovie = new Movie(value);
            newMovie.save((err) => {
                if (err) {
                    if (err.code == '11000') {
                        res.boom.badData('Movie \'' + value.name + '\' already exists');
                    } else {
                        res.boom.badImplementation('Error saving movie');
                    }
                } else {
                    res.json(newMovie);
                }
            });
        }
    });
};

exports.get = (req, res) => {
    Movie.findOne({_id: req.params.id})
        .exec({}, (err, movie) => {
            if (err) {
                res.boom.badImplementation('Error finding movie');
            } else {
                if (movie) {
                    res.json(movie);
                } else {
                    res.boom.notFound('Unable to identify movie ', req.params.id);
                }
            }
        });
};

exports.getAll = (req, res) => {
    let sort = {}, find = {};
    sort[req.query.sortBy] = req.query.sortSense === 'desc' ? -1 : 1;
    find = {
        user: req.query.user,
        movie: req.query.movie
    };
    Movie.find({})
        .populate({path: 'actors', model: 'actor'})
        .populate('createdBy', '-password')
        .sort(sort)
        .exec({}, (err, movies) => {
            if (err) {
                res.boom.badImplementation('Error finding movies');
            } else {
                res.json(movies || []);
            }
        });
};

exports.update = (req, res) => {
    Movie.findOne({_id: req.params.id})
        .exec({}, (err, movie) => {
            if (err) {
                res.boom.badImplementation('Error identifying movie');
            } else {
                if (movie) {
                    Joi.validate(req.body, MovieValidation, (err, value) => {
                        if (err) {
                            res.boom.badData(hooks.prettifyValidationErrors(err.details));
                        } else {
                            Movie.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true}, function (err, updatedMovie) {
                                if (err) {
                                    if (err.code == '11000') {
                                        res.boom.badData('Movie \'' + value.name + '\' already exists');
                                    } else {
                                        res.boom.badImplementation('Error updating movie');
                                    }
                                } else {
                                    res.json(updatedMovie);
                                }
                            });
                        }
                    });
                } else {
                    res.boom.notFound('Unable to identify movie ', req.params.id);
                }
            }
        });
};

exports.delete = (req, res) => {
    Movie.findOne({_id: req.params.id})
        .exec({}, (err, movie) => {
            if (err) {
                res.boom.badImplementation('Error identifying movie');
            } else {
                if (movie) {
                    Rating.remove({movie: movie._id}, function (err) {
                        if (err) {
                            res.boom.badImplementation('Error deleting movie ratings');
                        } else {
                            Movie.remove({_id: req.params.id}, function (err) {
                                if (err) {
                                    res.boom.badImplementation('Error deleting movie');
                                } else {
                                    res.status(200).end('Movie deleted successfully');
                                }
                            });
                        }
                    });
                } else {
                    res.boom.notFound('Unable to identify movie ', req.params.id);
                }
            }
        });
};