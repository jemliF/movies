const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    comment: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    movie: {
        type: Schema.Types.ObjectId,
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


const model = mongoose.model('rating', schema);

exports.schema = schema;
exports.model = model;