/**
 * @author Fathi Jemli <jemlifathi2013@gmail.com>
 */
const Joi = require('joi');
const jwt = require('jsonwebtoken');

const Actor = require('../models/Actor').model;
const ActorValidation = require('../../utils/validation').Actor;
const hooks = require('../../utils/hooks');
/**
 * Get a single actor
 * @memberof actors
 * @function
 * @param {Object} req - An HTTP request.
 * @param {Object} res - An HTTP response.
 */
exports.get = (req, res) => {
    Actor.findOne({_id: req.params.id})
        .exec({}, (err, actor) => {
            if (err) {
                res.boom.badImplementation('Error finding actor');
            } else {
                if (actor) {
                    res.json(actor);
                } else {
                    res.boom.notFound('Unable to identify actor ', req.params.id);
                }
            }
        });
};
/**
 * Get actors
 * @memberof actors
 * @function
 * @param {Object} req - An HTTP request.
 * @param {Object} res - An HTTP response.
 */
exports.getAll = (req, res) => {
    Actor.find({})
        .exec({}, (err, actor) => {
            if (err) {
                res.boom.badImplementation('Error finding actors');
            } else {
                if (actor) {
                    res.json(actor);
                } else {
                    res.boom.notFound('Unable to identify actors');
                }
            }
        });
};
/**
 * Create an actor
 * @memberof actors
 * @function
 * @param {Object} req - An HTTP request.
 * @param {Object} res - An HTTP response.
 */
exports.create = (req, res) => {
    Joi.validate(req.body, ActorValidation, (err, value) => {
        if (err) {

            res.boom.badData(hooks.prettifyValidationErrors(err.details));
        } else {
            let newActor = new Actor(value);
            newActor.save((err) => {
                if (err) {

                    if (err.code == '11000') {
                        res.boom.badData('Actor \'' + value.email + '\' already exists');
                    } else {
                        res.boom.badImplementation('Error saving actor');
                    }
                } else {
                    res.status(200).json(newActor);
                }
            });
        }
    });
};
/**
 * Update an actor
 * @memberof actors
 * @function
 * @param {Object} req - An HTTP request.
 * @param {Object} res - An HTTP response.
 */
exports.update = (req, res) => {
    Actor.findOne({_id: req.params.id})
        .exec({}, (err, actor) => {
            if (err) {
                res.boom.badImplementation('Error identifying actor');
            } else {
                if (actor) {
                    Joi.validate(req.body, ActorValidation, (err, value) => {
                        if (err) {
                            res.boom.badData(hooks.prettifyValidationErrors(err.details));
                        } else {
                            value.updatedAt = new Date();
                            Actor.findByIdAndUpdate(req.params.id, {$set: value}, {new: true}, function (err, updatedActor) {
                                if (err) {
                                    if (err.code == '11000') {
                                        res.boom.badData('Actor \'' + value.email + '\' already exists');
                                    } else {
                                        res.boom.badImplementation('Error updating actor');
                                    }
                                } else {
                                    res.json(updatedActor);
                                }
                            });
                        }
                    });
                } else {
                    res.boom.notFound('Unable to identify actor ', req.params.id);
                }
            }
        });
};