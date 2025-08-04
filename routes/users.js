const express = require('express');
const UsersController = require('../controllers/users');
const { tryCatch } = require('../utils/tryCatch');
const router = express.Router();

router.get('/', tryCatch(UsersController.getAll));
router.post('/', tryCatch(UsersController.addUser));
router.get('/:id', tryCatch(UsersController.deleteUser));
router.post('/:id', tryCatch(UsersController.updateUser));

module.exports = router;