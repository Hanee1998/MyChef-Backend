const recipeService = require('../service/recipeService');

class RecipeController {
    async getAllRecipes(req, res) {
        try {
            const recipes = await recipeService.getAllRecipes();
            res.json(recipes);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getRecipeById(req, res) {
        try {
            const recipe = await recipeService.getRecipeById(req.params.id);
            if (recipe) {
                res.json(recipe);
            } else {
                res.status(404).json({ message: 'Recipe not found' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getRecipesByUserEmail(req, res) {
        try {
            const recipes = await recipeService.getRecipesByUserEmail(req.params.email);
            res.json(recipes);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async addRecipe(req, res) {
        try {
            const newRecipe = await recipeService.addRecipe(req.body);
            res.status(201).json(newRecipe);
        } catch (error) {
            if (error.message.includes('upgrade to premium')) {
                res.status(403).json({ message: error.message, redirect: '/profile/purchase-premium' });
            } else {
                res.status(400).json({ message: error.message });
            }
        }
    }

    async updateRecipe(req, res) {
        try {
            const updatedRecipe = await recipeService.updateRecipe(req.params.id, req.body);
            if (updatedRecipe) {
                res.json(updatedRecipe);
            } else {
                res.status(404).json({ message: 'Recipe not found' });
            }
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async deleteRecipe(req, res) {
        try {
            const success = await recipeService.deleteRecipe(req.params.id);
            if (success) {
                res.status(204).send();
            } else {
                res.status(404).json({ message: 'Recipe not found' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async likeRecipe(req, res) {
        const { userEmail } = req.body;
        try {
            const recipe = await recipeService.likeRecipe(req.params.id, userEmail);
            res.status(200).json(recipe);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async unlikeRecipe(req, res) {
        const { userEmail } = req.body;
        try {
            const recipe = await recipeService.unlikeRecipe(req.params.id, userEmail);
            res.status(200).json(recipe);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new RecipeController();
