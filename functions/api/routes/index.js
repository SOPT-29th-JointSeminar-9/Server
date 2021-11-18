const express = require('express');
const router = express.Router();

router.use('/user', require('./user'));
router.use('/radio', require('./radio'));

module.exports = router;
