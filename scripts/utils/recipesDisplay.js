import { recipeFactory } from "../factories/recipe.js";
import { addTagListsElements, clearAllTagListsElements } from "./tagList.js";

//Stock displayed recipes in an array to sort them quicker;
export let currentRecipes = [];

//Get DOM elements
const recipeSection = document.querySelector('.recipes_section');

//displays the recipes in the recipes section
export function displayRecipes(recipes) {
    currentRecipes = recipes;  
    if(recipes.length > 0){
      recipeSection.textContent = "";
      recipes.forEach((recipe) => {
        const recipeModel = recipeFactory(recipe);
        const recipeCardDOM = recipeModel.getRecipeCardDOM();
        recipeSection.appendChild(recipeCardDOM);
      });
  
      //sort relevent tags
      clearAllTagListsElements();
      recipes.forEach((recipe)=>addTagListsElements(recipe));
    }
    else{
      recipeSection.textContent = "Aucune recette ne correspond à vos critères...";
    }
  }