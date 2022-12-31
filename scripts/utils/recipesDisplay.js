import { recipeFactory } from "../factories/recipe.js";

//Get DOM elements
const recipeSection = document.querySelector('.recipes_section');

//displays the recipes in the recipes section
export function displayRecipes(recipes) {
    recipeSection.textContent = "";
    
    recipes.forEach((recipe) => {
      const recipeModel = recipeFactory(recipe);
      const recipeCardDOM = recipeModel.getRecipeCardDOM();
      recipeSection.appendChild(recipeCardDOM);
    });
  }