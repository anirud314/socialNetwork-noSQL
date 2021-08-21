// this is the index in the api
const router = require('express').Router();
const user = require('./user-routes');
const thought = require('./thought-routes');

router.use('/users', user);
router.use('/thoughts', thought);

module.exports = router;