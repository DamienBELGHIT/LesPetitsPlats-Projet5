import { recipes } from "../../data/recipe.js";
import { recipeFactory } from "../factories/recipe.js";
import "../utils/filter.js";

//displays the recipes in array parameter
async function displayData(recipes) {
    const recipeSection = document.querySelector('.recipes_section');
  
    recipes.forEach((recipe) => {
      const recipeModel = recipeFactory(recipe);
      const recipeCardDOM = recipeModel.getRecipeCardDOM();
      recipeSection.appendChild(recipeCardDOM);
    });
  }
  
  async function init() {
    displayData(recipes);
  }
  
  init();