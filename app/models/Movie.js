const mongoose = require('mongoose');
const slug = require('slug');

const User = require('./User').schema;
const Actor = require('./Actor').schema;
const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    slug: {
        type: String
    },
    releaseDate: {
        type: Date,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        default: 0
    },
    actors: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'actor'
        }]
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
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
    var movie = this;
    if (!movie.isModified('name')) return next();
    movie.slug = slug(movie.name);
    next();
});

const model = mongoose.model('movie', schema);

exports.schema = schema;
exports.model = model;