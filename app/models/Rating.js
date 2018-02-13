const mongoose = require('mongoose');

/**Mongoose schema that represents ratings
 * @constant
 * @type mongoose.Schema
 *
 */
const schema = new mongoose.Schema({
    /**
     * The comment of the user
     * @property {string}
     */
    comment: {
        type: String,
        required: false
    },
    /**
     * The date of the rating
     * @property {date}
     */
    date: {
        type: Date,
        default: Date.now
    },
    /**
     * The value given by the user
     * @property {number}
     */
    value: {
        type: Number,
        required: true
    },
    /**
     * Reference of the user
     * @property {string}
     */
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    /**
     * Reference of the movie
     * @property {string}
     */
    movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'movie'
    },
    /**
     * The date of creation of the rating on the database
     * @property {date}
     */
    createdAt: {
        type: Date,
        default: Date.now
    },
    /**
     * The date of update of a rating on the database
     * @property {date}
     */
    updatedAt: {
        type: Date
    }
}, {
    versionKey: false
});


schema.index({user: 1, movie: 1}, {unique: true});


/**
 * The ratings model
 * @constant
 * @type {mongoose.Model}
 */
const model = mongoose.model('rating', schema);

exports.schema = schema;
exports.model = model;