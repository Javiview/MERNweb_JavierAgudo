const router = require('express').Router();

router.use('/auth', require('./auth.routes'))
router.use('/hangers', require('./hangers.routes'))

module.exports = router;