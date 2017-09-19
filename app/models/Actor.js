const mongoose = require('mongoose');

/**Mongoose schema that represents actors
 * @constant
 * @type mongoose.Schema
 *
 */
const schema = new mongoose.Schema({
    /**
     * The firstname of an actor
     * @property {string}
     */
    firstname: {
        type: String,
        required: true
    },
    /**
     * The lastname of an actor
     * @property {string}
     */
    lastname: {
        type: String,
        required: true
    },
    /**
     * The date of creation of an actor on the database
     * @property {date}
     */
    createdAt: {
        type: Date,
        default: Date.now
    },
    /**
     * The date of update of an actor on the database
     * @property {date}
     */
    updatedAt: {
        type: Date
    }
}, {
    versionKey: false
});

/**
 * The actors model
 * @constant
 * @type {mongoose.Model}
 */
const model = mongoose.model('actor', schema);

exports.schema = schema;
exports.model = model;