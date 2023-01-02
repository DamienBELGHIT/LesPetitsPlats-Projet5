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

//Sorts all recipes matching main search bar and tags
export function sortRecipesAllCriterias(recipesToSort){
    let sortedRecipes = recipesToSort;
    (searchBarInput.value.length >= MIN_CHARACTER_BEFORE_SORT) && (sortedRecipes = sortedRecipes.filter(recipe => sortRecipesGlobal(sortedRecipes, searchBarInput.value).includes(recipe)));
    activeTags.forEach((currentTag)=>{
        sortedRecipes = sortedRecipes.filter(recipe => sortRecipesGlobal(sortedRecipes, currentTag.name).includes(recipe));
    });
    return sortedRecipes;
}