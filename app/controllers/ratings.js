/**
 * @author Fathi Jemli <jemlifathi2013@gmail.com>
 */
const router = require('express').Router();
const hooks = require('../../utils/hooks');
const ratingHandler = require('../handlers/ratings');
/**
 * Create a new rating
 * @memberof ratings
 * @function
 * @name createRating
 */
router.post('/ratings', hooks.checkToken, ratingHandler.create);
/**
 * Get ratings
 * @memberof ratings
 * @function
 * @name getRatings
 */
router.get('/ratings', hooks.checkToken, ratingHandler.getAll);
/**
 * Get a single rating
 * @memberof ratings
 * @function
 * @name getRating
 */
router.get('/ratings/:id', hooks.checkToken, ratingHandler.get);
/**
 * Update a rating
 * @memberof ratings
 * @function
 * @name updateRating
 */
router.put('/ratings/:id', hooks.checkToken, ratingHandler.update);


module.exports = router;