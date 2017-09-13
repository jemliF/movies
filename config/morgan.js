const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

module.exports = fs.createWriteStream(path.join(__dirname, '../logs/access_log'), {flags: 'a'});