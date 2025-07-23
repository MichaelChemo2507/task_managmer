const express = require('express');
const LoginController = require('../controllers/login');
const router = express.Router();
 
router.get('/');
router.post('/',LoginController.authorizationProcess);

module.exports = router;