const mongoose = require('mongoose');
const slug = require('slug');

const User = require('./User').schema;
const Actor = require('./Actor').schema;

/**Mongoose schema that represents movies
 * @constant
 * @type mongoose.Schema
 *
 */
const schema = new mongoose.Schema({
    /**
     * The name of a movie
     * @property {string}
     */
    name: {
        type: String,
        required: true,
        unique: true
    },
    /**
     * The slug of a movie
     * @property {string}
     */
    slug: {
        type: String
    },
    /**
     * The release date of a movie
     * @property {date}
     */
    releaseDate: {
        type: Date,
        required: true
    },
    /**
     * The duration of a movie
     * @property {number}
     */
    duration: {
        type: Number,
        required: true
    },
    /**
     * The rating of a movie
     * @property {number}
     */
    rating: {
        type: Number,
        default: 0
    },
    /**
     * The list of actors of a movie
     * @property {array}
     */
    actors: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'actor'
        }]
    },
    /**
     * The reference of the creator of a movie
     * @property {string}
     */
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    /**
     * The date of creation of a user on the database
     * @property {date}
     */
    createdAt: {
        type: Date,
        default: Date.now
    },
    /**
     * The date of update of a user on the database
     * @property {date}
     */
    updatedAt: {
        type: Date
    }
}, {
    versionKey: false
});

/**
 * Movie pre save hook to update the slug of the movie in case we edited the name
 * @function
 *
 */
schema.pre('save', function (next) {
    var movie = this;
    if (!movie.isModified('name')) return next();
    movie.slug = slug(movie.name);
    next();
});

/**
 * The movies model
 * @constant
 * @type {mongoose.Model}
 */
const model = mongoose.model('movie', schema);

exports.schema = schema;
exports.model = model;