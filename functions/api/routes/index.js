const express = require('express');
const router = express.Router();

router.use('/radio', require('./radio'));

module.exports = router;
