require('dotenv').config();

const express = require('express');
const boom = require('express-boom');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const passport = require('passport');

const mongodb = require('./providers/mongodb');

const app = express();
app.use(cors());
app.use(boom());
app.use(passport.initialize());
passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(morgan('combined', {
    stream: require('./config/morgan')
}));

app.use('/', express.static('public'));
app.use('/api/v1', require('./app/controllers/users'));
app.use('/api/v1', require('./app/controllers/movies'));
app.use('/api/v1', require('./app/controllers/actors'));

mongodb.check();
require('./utils/passport');

app.listen(process.env.APP_PORT, () => {
    console.log('+++++++++++++++ Server running at ' + process.env.APP_PORT + ' ++++++++++++++++');
});