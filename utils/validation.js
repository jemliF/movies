const Joi = require('joi');

exports.User = Joi.object().keys({
    _id: Joi.string(),
    createdAt: Joi.date(),
    updatedAt: Joi.date(),
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required()
});

exports.Movie = Joi.object().keys({
    _id: Joi.string(),
    createdAt: Joi.date(),
    updatedAt: Joi.date(),
    name: Joi.string().required(),
    slug: Joi.string(),
    releaseDate: Joi.date().required(),
    duration: Joi.number().positive().required(),
    rating: Joi.number().positive(),
    actors: Joi.array().items(Joi.string()),
    createdBy: Joi.string()
});

exports.Rating = Joi.object().keys({
    _id: Joi.string(),
    createdAt: Joi.date(),
    updatedAt: Joi.date(),
    comment: Joi.string(),
    date: Joi.date(),
    movie: Joi.string().required(),
    user: Joi.string().required()
});

exports.Actor = Joi.object().keys({
    _id: Joi.string(),
    createdAt: Joi.date(),
    updatedAt: Joi.date(),
    firstname: Joi.string().required(),
    lastname: Joi.string().required()
});