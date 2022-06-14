let router = require('express').Router();

router.use(require('./user'));
router.use(require('./room'));
router.use(require('./device'));

module.exports = router;
