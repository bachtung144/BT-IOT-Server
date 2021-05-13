let router = require('express').Router();

router.use(require('./user'));
router.use(require('./listRoom'));

module.exports = router;
