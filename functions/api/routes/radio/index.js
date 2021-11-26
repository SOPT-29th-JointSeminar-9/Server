const express = require('express');
const router = express.Router();

router.get('/', require('./radioListGET'));
router.get('/popular', require('./radioListPopularGET'));
router.get('/:hugId', require('./radioGET'));
router.post('/', require('./radioPOST'));

module.exports = router;
