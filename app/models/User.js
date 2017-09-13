const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const schema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true

    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date
    }
}, {
    versionKey: false
});

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

schema.methods.comparePasswords = function (pw, next) {
    bcrypt.compare(pw, this.password, function (err, isMatch) {
        if (err) {
            return next(err);
        } else {
            return next(null, isMatch);
        }
    });
};


const model = mongoose.model('user', schema);

exports.schema = schema;
exports.model = model;