const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    ingredients: {
        type: [String],
        required: true
    },
    spices: {
        type: [String],
        required: true
    },
    steps: {
        type: [String],
        required: true
    },
    cuisine: {
        type: String,
        required: true
    },
    style: {
        type: String,
        required: true
    },
    protein: {
        type: String,
        required: true
    },
    liked: {
        type: Boolean,
        default: false
    },
    userEmail: {
        type: String,
        required: true
    },
    likeCount: {
        type: Number,
        default: 0
    },
    likedBy: {
        type: [String],
        default: []
    },
    image: {
        type: String, // Store image as a Base64 string
        default: ''
    }
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
