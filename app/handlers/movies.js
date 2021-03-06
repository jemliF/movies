/**
 * @author Fathi Jemli <jemlifathi2013@gmail.com>
 */
const Movie = require('../models/Movie').model;
const Rating = require('../models/Rating').model;
const MovieValidation = require('../../utils/validation').Movie;
const Joi = require('joi');
const hooks = require('../../utils/hooks');

/**
 * Create a movie
 * @memberof movies
 * @function
 * @param {Object} req - An HTTP request.
 * @param {Object} res - An HTTP response.
 */
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
/**
 * Get a movie
 * @memberof movies
 * @function
 * @param {Object} req - An HTTP request.
 * @param {Object} res - An HTTP response.
 */
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
/**
 * Get movies
 * @memberof movies
 * @function
 * @param {Object} req - An HTTP request.
 * @param {Object} res - An HTTP response.
 */
exports.getAll = (req, res) => {
    //console.log(res.query.user);
    let sort = {}, find = {};
    sort[req.query.sortBy] = req.query.sortSense === 'desc' ? -1 : 1;
    find = {};
    req.query.createdBy ? find.createdBy = req.query.createdBy : null;
    req.query.movie ? find.movie = req.query.movie : null;
    Movie.find(find)
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
/**
 * Update a movie
 * @memberof movies
 * @function
 * @param {Object} req - An HTTP request.
 * @param {Object} res - An HTTP response.
 */
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
                            value.updatedAt = new Date();
                            Movie.findByIdAndUpdate(req.params.id, {$set: value}, {new: true}, function (err, updatedMovie) {
                                if (err) {
                                    if (err.code == '11000') {
                                        res.boom.badData('Movie \'' + value.name + '\' already exists');
                                    } else {
                                        res.boom.badImplementation('Error updating movie');
                                    }
                                } else {
                                    Movie
                                        .populate(updatedMovie, 'createdBy actors', (err, movie) => {
                                            res.json(updatedMovie);
                                        });
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
/**
 * Delete a movie
 * @memberof movies
 * @function
 * @param {Object} req - An HTTP request.
 * @param {Object} res - An HTTP response.
 */
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