const express = require('express');
const CategoriesController = require('../controllers/categories');
const { tryCatch } = require('../utils/tryCatch');
const router = express.Router();

// router.use(require('../middleware/authenticationProcess'));

router.get('/page', tryCatch(CategoriesController.getCategoriesPage));
router.get('/', tryCatch(CategoriesController.getAll));
//router.get('/', tryCatch(CategoriesController.getAllByUserId)); //with authentcation
router.get('/:id', tryCatch(CategoriesController.getAllByUserId));

module.exports = router;