const router = require('express').Router();
const hooks = require('../../utils/hooks');
const actorHandler = require('../handlers/actors');

router.post('/actors', actorHandler.create);
router.get('/actors', actorHandler.getAll);
router.get('/actors/:id', hooks.checkToken, actorHandler.get);


module.exports = router;