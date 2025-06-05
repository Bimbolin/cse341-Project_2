const express = require('express');
const router = express.Router();

const getRecipesController = require('../controllers/recipes');
const { isAuthenticated } = require('../middleware/authenticated');

router.get('/', getRecipesController.getAll);
router.get('/:id', getRecipesController.getSingle);
router.post('/', isAuthenticated, getRecipesController.createRecipe);
router.put('/:id', isAuthenticated, getRecipesController.updateRecipe);
router.delete('/:id', isAuthenticated, getRecipesController.deleteRecipe);

module.exports = router;