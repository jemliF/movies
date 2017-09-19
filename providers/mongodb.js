/**
 * @author fathi Jemli <jemlifathi2013@gmail.com>
 */
const mongoose = require('mongoose');
/**
 * Mongo Check
 * @function
 * @name check
 */
exports.check = () => {
    mongoose.Promise = global.Promise;
    if (process.env.ENVIRONMENT === 'dev') {
        mongoose.set('debug', true);
    }
    mongoose.connect('mongodb://' + process.env.MONGO_HOST + ':' + process.env.MONGO_PORT + '/' + process.env.MONGO_DATABASE, {
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