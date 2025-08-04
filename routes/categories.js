const express = require('express');
const CategoriesController = require('../controllers/categories');
const { tryCatch } = require('../utils/tryCatch');
const router = express.Router();

// router.use(require('../middleware/authenticationProcess'));

router.get('/', tryCatch(CategoriesController.getAll));

module.exports = router;