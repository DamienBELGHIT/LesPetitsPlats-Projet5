import { recipes } from "../../data/recipe.js";
import { displayRecipes } from "../utils/recipesDisplay.js";
import { sortRecipesGlobal } from "./sortRecipes.js";
import { activeTags } from "./tag.js";

export const MIN_CHARACTER_BEFORE_SORT = 3;

//Get DOM elements
const searchBar = document.getElementById("searchbar");
export const searchBarInput = searchBar.querySelector("input");

//Event sorting and displaying all recipes when 3 or more characters are entered in the searchbar
searchBarInput.addEventListener("input", ()=>{
    displayRecipes(sortRecipesAllCriterias(recipes));
});

//Returns all recipes matching main search bar and tags
export function sortRecipesAllCriterias(recipesToSort){
    let sortedRecipes = recipesToSort;
    (searchBarInput.value.length >= MIN_CHARACTER_BEFORE_SORT) && (sortedRecipes = arraysIntersection(sortedRecipes, sortRecipesGlobal(sortedRecipes, searchBarInput.value)));
    activeTags.forEach((tag)=>{
        sortedRecipes = arraysIntersection(sortedRecipes, sortRecipesGlobal(sortedRecipes, tag.name));
    });
    return sortedRecipes;
}

//Returns the intersection between 2 arrays
function arraysIntersection(array1, array2){
    return array1.filter(elem => array2.includes(elem));
}