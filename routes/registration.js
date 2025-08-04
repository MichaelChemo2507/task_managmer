const express = require('express');
const RegistrationController = require('../controllers/registration');
const { tryCatch } = require('../utils/tryCatch');
const router = express.Router();

router.get('/', tryCatch(RegistrationController.getRegistrationPage));
router.post('/', tryCatch(RegistrationController.registrationProcess));

module.exports = router;