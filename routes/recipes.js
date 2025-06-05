const express = require('express');
const router = express.Router();

const getRecipesController = require('../controllers/recipes');
//const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', getRecipesController.getAll);
router.get('/:id', getRecipesController.getSingle);
router.post('/', getRecipesController.createRecipe);
router.put('/:id', getRecipesController.updateRecipe);
router.delete('/:id', getRecipesController.deleteRecipe);

module.exports = router;