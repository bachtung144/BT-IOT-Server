let router = require('express').Router();

router.use(require('./building'));
router.use(require('./apartment'));
router.use(require('./room'));
router.use(require('./user'));
router.use(require('./device'));
router.use(require('./chip'));

module.exports = router;
