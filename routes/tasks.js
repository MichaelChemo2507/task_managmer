const express = require('express');
const TasksController = require('../controllers/tasks');
const { tryCatch } = require('../utils/tryCatch');
const router = express.Router();

// router.use(require('../middleware/authenticationProcess'));

// router.get('/page', tryCatch(CategoriesController.getCategoriesPage));
router.get('/all', tryCatch(TasksController.getAll));
router.get('/', tryCatch(TasksController.getAllByUserId));
// router.get('/delete/:id', tryCatch(CategoriesController.deleteCategory));
router.post('/', tryCatch(TasksController.addTask));
// router.post('/:id', tryCatch(CategoriesController.updateCategory));

module.exports = router;