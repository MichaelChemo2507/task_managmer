const express = require('express');
const LoginController = require('../controllers/login');
const { tryCatch } = require('../utils/tryCatch');
const router = express.Router();

router.post('/', tryCatch(LoginController.authorizationProcess));

module.exports = router;