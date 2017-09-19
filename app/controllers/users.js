/**
 * @author Fathi Jemli <jemlifathi2013@gmail.com>
 */
const router = require('express').Router();
const hooks = require('../../utils/hooks');
const userHandler = require('../handlers/users');

/**
 * User login
 * @memberof users
 * @function
 * @name loginUser
 */
router.post('/users/login', userHandler.login);
/**
 * Create a new user
 * @memberof users
 * @function
 * @name createUser
 */
router.post('/users', userHandler.signup);
/**
 * Get a single user
 * @memberof users
 * @function
 * @name getUser
 */
router.get('/users/:id', hooks.checkToken, userHandler.get);


module.exports = router;