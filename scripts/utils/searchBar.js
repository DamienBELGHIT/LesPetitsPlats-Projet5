import { sortRecipesGlobal } from "./sortRecipes.js";
import { recipes } from "../../data/recipe.js";
import { displayRecipes } from "../utils/recipesDisplay.js";

const MIN_CHARACTER_BEFORE_SORT = 3;

//Get DOM elements
const searchBar = document.getElementById("searchbar");
const searchBarInput = searchBar.querySelector("input");

//Event sorting and displaying all recipes when 3 or more characters are entered in the searchbar
searchBarInput.addEventListener("input", ()=>{
    if(searchBarInput.value.length >= MIN_CHARACTER_BEFORE_SORT){
        const sortedRecipes = sortRecipesGlobal(recipes, searchBarInput.value)
        displayRecipes(sortedRecipes);
    }else{
        displayRecipes(recipes);
    }
});