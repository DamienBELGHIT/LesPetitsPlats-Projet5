import { recipes } from "../../data/recipe.js";
import { recipeFactory } from "../factories/recipe.js";
import "../utils/filter.js";
import { filterElementFactory } from "../factories/filterElement.js";

//displays the recipes in array parameter
function displayData(recipes) {
    const recipeSection = document.querySelector('.recipes_section');
  
    recipes.forEach((recipe) => {
      const recipeModel = recipeFactory(recipe);
      const recipeCardDOM = recipeModel.getRecipeCardDOM();
      recipeSection.appendChild(recipeCardDOM);
    });
  }

//Arrays keeping tracks of all filter lists elements to prevent doubles
let ingredientFilters = [];
let deviceFilters = [];
let ustensilFilters = [];

//Inserts all elements of a recipe to all filter lists
function addFilters(recipe){
  //adds elements to ingredient filter list
  const filterIngredient = document.getElementById("ingredient-filter");
  const ingredientList = filterIngredient.querySelector("ul");
  recipe.ingredients.forEach((ingredient)=>{
    const ingredientName = ingredient.ingredient;
    if(!ingredientFilters.includes(ingredientName.toLowerCase())){
      ingredientFilters += ingredientName.toLowerCase();
      addFilterElement(ingredientName, "ingredient", ingredientList);
    }
  });

  //adds elements to devices filter list
  const filterDevice = document.getElementById("device-filter");
  const deviceList = filterDevice.querySelector("ul");
  const deviceName = recipe.appliance;
  if(!deviceFilters.includes(deviceName.toLowerCase())){
    deviceFilters += deviceName.toLowerCase();
    addFilterElement(deviceName, "device", deviceList);
  }

  //adds elements to ustensils filter list
  const filterUstensil = document.getElementById("ustensil-filter");
  const ustensilList = filterUstensil.querySelector("ul");
  recipe.ustensils.forEach((ustensil)=>{
    if(!ustensilFilters.includes(ustensil.toLowerCase())){
      ustensilFilters += ustensil.toLowerCase();
      addFilterElement(ustensil, "ustensil", ustensilList);
    }
  });
}

//Inserts a filter element into a list
function addFilterElement(name, type, list){
  const filterElementModel = filterElementFactory({name:name.charAt(0).toUpperCase() + name.slice(1), type:type});
  const filterElementDOM = filterElementModel.getFilterDOM();
  list.appendChild(filterElementDOM);
}

function init() {
  displayData(recipes);
  recipes.forEach((recipe)=>addFilters(recipe));
}

init();