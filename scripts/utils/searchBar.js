import { recipes } from "../../data/recipe.js";
import { displayRecipes } from "../utils/recipesDisplay.js";
import { sortRecipesAllCriterias } from "./sortRecipesAllCriterias.js";

export const MIN_CHARACTER_BEFORE_SORT = 3;

//Get DOM elements
const searchBar = document.getElementById("searchbar");
export const searchBarInput = searchBar.querySelector("input");

//Event sorting and displaying all recipes when 3 or more characters are entered in the searchbar
searchBarInput.addEventListener("input", ()=>{
    displayRecipes(sortRecipesAllCriterias(recipes));
});