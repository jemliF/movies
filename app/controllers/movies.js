const router = require('express').Router();
const hooks = require('../../utils/hooks');
const movieHandler = require('../handlers/movies');

router.post('/movies', hooks.checkToken, movieHandler.create);
router.get('/movies', hooks.checkToken, movieHandler.getAll);
router.get('/movies/:id', hooks.checkToken, movieHandler.get);
router.put('/movies/:id', hooks.checkToken, movieHandler.update);
router.delete('/movies/:id', hooks.checkToken, movieHandler.delete);


module.exports = router;