const express = require('express');
const LoginController = require('../controllers/users');
const { tryCatch } = require('../utils/tryCatch');
const router = express.Router();

router.get('/', tryCatch(LoginController.getLoginPage));
router.post('/', tryCatch(LoginController.authorizationProcess));

module.exports = router;