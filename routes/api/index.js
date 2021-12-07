let router = require('express').Router();

router.use(require('./user'));
router.use(require('./room'));
router.use(require('./apartment'));

module.exports = router;
