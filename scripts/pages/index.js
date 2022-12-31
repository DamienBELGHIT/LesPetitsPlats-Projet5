import { recipes } from "../../data/recipe.js";
import { tagListElementFactory } from "../factories/tagListElement.js";
import { displayRecipes } from "../utils/recipesDisplay.js";
import "../utils/tagList.js";
import "../utils/searchBar.js";

//Arrays keeping tracks of all tagList lists elements to prevent doubles
let ingredientTagLists = [];
let deviceTagLists = [];
let ustensilTagLists = [];

//Inserts all elements of a recipe to all tagList lists
function addTagLists(recipe){
  //adds elements to ingredient tagList list
  const tagListIngredient = document.getElementById("ingredient-tagList");
  const ingredientList = tagListIngredient.querySelector("ul");
  recipe.ingredients.forEach((ingredient)=>{
    const ingredientName = ingredient.ingredient;
    if(!ingredientTagLists.includes(ingredientName.toLowerCase())){
      ingredientTagLists += ingredientName.toLowerCase();
      addTagListElement(ingredientName, "ingredient", ingredientList);
    }
  });

  //adds elements to devices tagList list
  const tagListDevice = document.getElementById("device-tagList");
  const deviceList = tagListDevice.querySelector("ul");
  const deviceName = recipe.appliance;
  if(!deviceTagLists.includes(deviceName.toLowerCase())){
    deviceTagLists += deviceName.toLowerCase();
    addTagListElement(deviceName, "device", deviceList);
  }

  //adds elements to ustensils tagList list
  const tagListUstensil = document.getElementById("ustensil-tagList");
  const ustensilList = tagListUstensil.querySelector("ul");
  recipe.ustensils.forEach((ustensil)=>{
    if(!ustensilTagLists.includes(ustensil.toLowerCase())){
      ustensilTagLists += ustensil.toLowerCase();
      addTagListElement(ustensil, "ustensil", ustensilList);
    }
  });
}

//Inserts a tagList element into a list
function addTagListElement(name, type, list){
  const tagListElementModel = tagListElementFactory({name:name.charAt(0).toUpperCase() + name.slice(1), type:type});
  const tagListElementDOM = tagListElementModel.getTagListDOM();
  list.appendChild(tagListElementDOM);
}

function init() {
  displayRecipes(recipes);
  recipes.forEach((recipe)=>addTagLists(recipe));
}

init();