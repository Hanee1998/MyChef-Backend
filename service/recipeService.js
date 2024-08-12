const Recipe = require('../models/Recipe');
const User = require('../models/User');
const Earnings = require('../models/Earnings');
class RecipeService {
    async getAllRecipes() {
        return await Recipe.find();
    }

    async getRecipeById(id) {
        return await Recipe.findById(id);
    }

    async getRecipesByUserEmail(email) {
        return await Recipe.find({ userEmail: email });
    }

    async addRecipe(recipeData) {
        const user = await User.findOne({ email: recipeData.userEmail });

        if (!user) {
            throw new Error('User not found');
        }

        if (!user.isPremiumUser && user.recipeCount >= 3) {
            throw new Error('Free user cannot add more than 3 recipes. Please upgrade to premium.');
        }

        const recipe = new Recipe(recipeData);
        await recipe.save();

        user.recipeCount += 1;
        await user.save();

        return recipe;
    }

    async updateRecipe(id, recipeData) {
        return await Recipe.findByIdAndUpdate(id, recipeData, { new: true });
    }

    async deleteRecipe(id) {
        return await Recipe.findByIdAndDelete(id);
    }

    async likeRecipe(recipeId, userEmail) {
        const recipe = await Recipe.findById(recipeId);
        if (!recipe) {
            throw new Error('Recipe not found');
        }
    
        if (recipe.likedBy.includes(userEmail)) {
            throw new Error('User has already liked this recipe');
        }
    
        recipe.likeCount += 1;
        recipe.likedBy.push(userEmail);
        await recipe.save();
    
        // Update earnings
        await this.updateEarnings(recipeId, recipe.userEmail, recipe.likeCount);
    
        return recipe;
    }
    
    async unlikeRecipe(recipeId, userEmail) {
        const recipe = await Recipe.findById(recipeId);
        if (!recipe) {
            throw new Error('Recipe not found');
        }
    
        const likedIndex = recipe.likedBy.indexOf(userEmail);
        if (likedIndex === -1) {
            throw new Error('User has not liked this recipe');
        }
    
        recipe.likeCount -= 1;
        recipe.likedBy.splice(likedIndex, 1);
        await recipe.save();
    
        // Update earnings
        await this.updateEarnings(recipeId, recipe.userEmail, recipe.likeCount);
    
        return recipe;
    }
    
    async updateEarnings(recipeId, userEmail, likeCount) {
        const setsOf100Likes = Math.floor(likeCount / 100);
    
        let earningsRecord = await Earnings.findOne({ recipeId });
    
        if (!earningsRecord) {
            earningsRecord = new Earnings({
                recipeId,
                userId: userEmail,
                setsOf100Likes,
                earnings: setsOf100Likes * 10
            });
        } else {
            if (setsOf100Likes > earningsRecord.setsOf100Likes) {
                earningsRecord.setsOf100Likes = setsOf100Likes;
                earningsRecord.earnings = setsOf100Likes * 10;
            }
        }
        await earningsRecord.save();
    
        // Update user's total earnings
        const totalEarnings = await this.calculateTotalEarnings(userEmail);
        await User.updateOne({ email: userEmail }, { earnings: totalEarnings });
    }
    
    async calculateTotalEarnings(userEmail) {
        const earningsRecords = await Earnings.find({ userId: userEmail });
        const totalSetsOf100Likes = earningsRecords.reduce((total, record) => total + record.setsOf100Likes, 0);
        return totalSetsOf100Likes * 10;
    }
}

module.exports = new RecipeService();
