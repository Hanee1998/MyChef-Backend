const mongoose = require('mongoose');

const earningsSchema = new mongoose.Schema({
  recipeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Recipe',
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  setsOf100Likes: {
    type: Number,
    default: 0
  },
  earnings: {
    type: Number,
    default: 0
  },
  withdrawal: {
    type: Number,
    default: 0
  }
});

const Earnings = mongoose.model('Earnings', earningsSchema);

module.exports = Earnings;
