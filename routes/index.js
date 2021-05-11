let router = require('express').Router();
const env  = require('../env.json')
router.use(env.API, require('./api'));

module.exports = router;
