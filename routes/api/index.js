let router = require('express').Router();

router.use(require('./user'));
router.use(require('./room'));

module.exports = router;
