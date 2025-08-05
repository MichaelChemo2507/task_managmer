const express = require('express');
const CategoriesController = require('../controllers/categories');
const { tryCatch } = require('../utils/tryCatch');
const router = express.Router();

router.use(require('../middleware/authenticationProcess'));

router.get('/page', tryCatch(CategoriesController.getCategoriesPage));
router.get('/all', tryCatch(CategoriesController.getAll));
router.get('/', tryCatch(CategoriesController.getAllByUserId));
router.get('/delete/:id', tryCatch(CategoriesController.deleteCategory));
router.post('/', tryCatch(CategoriesController.addCategory));
router.post('/:id', tryCatch(CategoriesController.updateCategory));

module.exports = router;