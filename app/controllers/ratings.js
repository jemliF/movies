const router = require('express').Router();
const hooks = require('../../utils/hooks');
const ratingHandler = require('../handlers/ratings');

router.post('/ratings', hooks.checkToken, ratingHandler.create);
router.get('/ratings', hooks.checkToken, ratingHandler.getAll);
router.get('/ratings/:id', hooks.checkToken, ratingHandler.get);
router.put('/ratings/:id', hooks.checkToken, ratingHandler.update);
router.delete('/ratings/:id', hooks.checkToken, ratingHandler.delete);


module.exports = router;