const express = require('express');

const router = express.Router();
 
router.use('/login', require('./login')); 
router.use('/registration', require('./registration')); 
router.use('/users', require('./users')); 

router.use(require('../middleware/errorHandller'))
module.exports = router;