const mongoose = require('mongoose');
exports.check = () => {
    mongoose.Promise = global.Promise;
    mongoose.set('debug', true);
    mongoose.connect('mongodb://localhost:27017/movies', {
        user: process.env.MONGO_USER,
        pass: process.env.MONGO_PASSWORD
    }, (err) => {
        if (err) {
            console.error('------------- MongoDB is down: ', err)
        } else {
            console.log('*************** MongoDB is up *********************')
        }
    });
};