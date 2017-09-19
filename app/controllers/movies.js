/**
 * @author Fathi Jemli <jemlifathi2013@gmail.com>
 */
const router = require('express').Router();
const hooks = require('../../utils/hooks');
const movieHandler = require('../handlers/movies');
/**
 * Create a new movie
 * @memberof movies
 * @function
 * @name createMovie
 */
router.post('/movies', hooks.checkToken, movieHandler.create);
/**
 * Get movies
 * @memberof movies
 * @function
 * @name getMovies
 */
router.get('/movies', hooks.checkToken, movieHandler.getAll);
/**
 * Get a single movie
 * @memberof movies
 * @function
 * @name getMovie
 */
router.get('/movies/:id', hooks.checkToken, movieHandler.get);
/**
 * Update a movie
 * @memberof movies
 * @function
 * @name updateMovie
 */
router.put('/movies/:id', hooks.checkToken, movieHandler.update);
/**
 * Delete a movie
 * @memberof movies
 * @function
 * @name deleteMovie
 */
router.delete('/movies/:id', hooks.checkToken, movieHandler.delete);


module.exports = router;