const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    comment: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        default: Date.now
    },
    value:{
      type: Number,
      required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'movie'
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

schema.index({user: 1, movie: 1}, {unique: true});


const model = mongoose.model('rating', schema);

exports.schema = schema;
exports.model = model;