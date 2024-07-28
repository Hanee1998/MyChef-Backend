const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');

router.get('/recipes', (req, res) => recipeController.getAllRecipes(req, res));
router.get('/recipes/:id', (req, res) => recipeController.getRecipeById(req, res));
router.get('/user/:email/recipes', (req, res) => recipeController.getRecipesByUserEmail(req, res));
router.post('/addRecipes', (req, res) => recipeController.addRecipe(req, res));
router.put('/recipes/:id', (req, res) => recipeController.updateRecipe(req, res));
router.delete('/recipes/:id', (req, res) => recipeController.deleteRecipe(req, res));
router.put('/recipes/:id/like', (req, res) => recipeController.likeRecipe(req, res));
router.put('/recipes/:id/unlike', (req, res) => recipeController.unlikeRecipe(req, res));


module.exports = router;
