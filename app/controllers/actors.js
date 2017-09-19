/**
 * @author Fathi Jemli <jemlifathi2013@gmail.com>
 */
const router = require('express').Router();
const hooks = require('../../utils/hooks');
const actorHandler = require('../handlers/actors');
/**
 * Create a new actor
 * @memberof actors
 * @function
 * @name createActor
 */
router.post('/actors', hooks.checkToken, actorHandler.create);
/**
 * Get actors
 * @memberof actors
 * @function
 * @name getActor
 */
router.get('/actors', hooks.checkToken, actorHandler.getAll);
/**
 * Get a single actor
 * @memberof actors
 * @function
 * @name getActor
 */
router.get('/actors/:id', hooks.checkToken, actorHandler.get);


module.exports = router;