const jwt = require('jsonwebtoken');

exports.prettifyValidationErrors = (err) => {
    let prettyResults = [];
    for (let field in err) {
        if (err.hasOwnProperty(field)) {
            let pretty = {};
            let path = '';
            path = err[field].path;
            pretty[path] = err[field].message.replace(/['"]+/g, '');
            prettyResults.push(pretty);
        }
    }
    return prettyResults;
};

exports.checkToken = (req, res, next) => {
    let token = req.headers['authorization'];
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                console.error(err);
                res.boom.forbidden('Failed to authenticate token');
            } else {
                if (decoded) {
                    req.token = decoded;
                    next();
                } else {
                    res.boom.forbidden('Failed to authenticate token');
                }
            }
        })
    } else {
        res.boom.forbidden('No token provided');
    }
};