const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
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


const model = mongoose.model('actor', schema);

exports.schema = schema;
exports.model = model;