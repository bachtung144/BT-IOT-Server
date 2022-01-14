let router = require('express').Router();
const env  = require('../env.json')
router.use(env.API, require('./api'));
router.use(env.API, require('./apiAdmin'));

module.exports = router;
