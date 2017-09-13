const router = require('express').Router();
const hooks = require('../../utils/hooks');
const userHandler = require('../handlers/users');

router.post('/users/login', userHandler.login);
router.post('/users', userHandler.signup);
router.get('/users/:id', hooks.checkToken, userHandler.get);


module.exports = router;