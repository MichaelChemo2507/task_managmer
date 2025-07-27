const express = require('express');

const router = express.Router();
 
router.use('/login', require('./login'));

router.use(require('../middleware/errorHandller'))
module.exports = router;