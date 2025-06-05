const express = require('express');
const router = express.Router();
const controller = require('../controllers/recipes');
const { isAuthenticated } = require('../middleware/authenticate'); // adjust path as needed

router.get('/', controller.getAll);
router.get('/:id', controller.getSingle);

// 🔒 Protected routes
router.post('/', isAuthenticated, controller.createRecipe);
router.put('/:id', isAuthenticated, controller.updateRecipe);
router.delete('/:id', isAuthenticated, controller.deleteRecipe);

module.exports = router;
