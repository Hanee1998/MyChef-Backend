const express = require('express');
const router = express.Router();
const { updateUser, createUser } = require('../controllers/userController');
const User = require('../models/User');


router.post('/:email', createUser);

router.put('/:email', updateUser);

router.get('/:email', async (req, res) => {
  try {
    console.log(req.params.email)
    const user = await User.findOne({ email: req.params.email });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.put('/:email/purchasePremium', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.isPremiumUser = true;
    await user.save();
    res.status(200).json({ message: 'User updated to premium' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/:email/saveRecipe', async (req, res) => {
  const { email } = req.params;
  const { recipeId } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.savedRecipes.includes(recipeId)) {
      user.savedRecipes.push(recipeId);
      await user.save();
    } else {
      user.savedRecipes.pull(recipeId);
      await user.save();
    }

    res.status(200).json({ message: 'Recipe saved status updated', savedRecipes: user.savedRecipes });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.get('/:email/savedRecipes', async (req, res) => {
  const { email } = req.params;

  try {
    const user = await User.findOne({ email }).populate('savedRecipes');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user.savedRecipes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



module.exports = router;
