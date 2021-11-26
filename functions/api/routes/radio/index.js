const express = require('express');
const router = express.Router();

//router.get('/', require('./radioGET'));
router.get('/popular', require('./radioPopularGET'));
router.post('/', require('./radioPOST'));

module.exports = router;
