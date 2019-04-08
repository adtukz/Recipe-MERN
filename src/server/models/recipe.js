const mongoose = require('mongoose');

const RecipeSchema = mongoose.Schema({
  img: string,
  label: string,
  calories: int,
  serves: int,
  ingredients: array,
  dietLabels: array,
  healthLabels: array,
  url: string,
  comment: string
});

module.exports = mongoose.model('Recipe', RecipeSchema);
