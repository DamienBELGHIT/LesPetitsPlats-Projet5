import { activeTags } from "./tag.js";
import {MIN_CHARACTER_BEFORE_SORT, searchBarInput} from "./searchBar.js";
import { sortRecipesGlobal } from "./sortRecipes.js";

//Sorts all recipes matching main search bar and tags
export function sortRecipesAllCriterias(recipesToSort){
    let sortedRecipes = recipesToSort;
    (searchBarInput.value.length >= MIN_CHARACTER_BEFORE_SORT) && (sortedRecipes = sortedRecipes.filter(recipe => sortRecipesGlobal(sortedRecipes, searchBarInput.value).includes(recipe)));
    activeTags.forEach((currentTag)=>{
        sortedRecipes = sortedRecipes.filter(recipe => sortRecipesGlobal(sortedRecipes, currentTag.name).includes(recipe));
    });
    return sortedRecipes;
}