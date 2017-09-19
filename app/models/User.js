const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

/**Mongoose schema that represents users
 * @constant
 * @type mongoose.Schema
 *
 */
const schema = new mongoose.Schema({
    /**
     * The firstname of a user
     * @property {string}
     */
    firstname: {
        type: String,
        required: true
    },
    /**
     * The lastname of a user
     * @property {string}
     */
    lastname: {
        type: String,
        required: true
    },
    /**
     * The email of a user
     * @property {string}
     */
    email: {
        type: String,
        required: true,
        unique: true
    },
    /**
     * The password of a user
     * @property {string}
     */
    password: {
        type: String,
        required: true

    },
    /**
     * The date of creation of an user on the database
     * @property {date}
     */
    createdAt: {
        type: Date,
        default: Date.now
    },
    /**
     * The date of update of an user on the database
     * @property {date}
     */
    updatedAt: {
        type: Date
    }
}, {
    versionKey: false
});
/**
 * User pre save hook to encrypt the user password in case it was edited
 * @function
 *
 */
schema.pre('save', function (next) {
    var user = this;
    if (!user.isModified('password')) return next();
    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            return next(err);
        } else {
            bcrypt.hash(user.password, salt, (err, hash) => {
                if (err) {
                    return next(err);
                } else {
                    user.password = hash;
                    next();
                }
            });
        }
    })
});
/**
 * User schema method to compare the user already encrypted password with an another attempt
 * @function
 *
 */
schema.methods.comparePasswords = function (pw, next) {
    bcrypt.compare(pw, this.password, function (err, isMatch) {
        if (err) {
            return next(err);
        } else {
            return next(null, isMatch);
        }
    });
};

/**
 * The users model
 * @constant
 * @type {mongoose.Model}
 */
const model = mongoose.model('user', schema);

exports.schema = schema;
exports.model = model;