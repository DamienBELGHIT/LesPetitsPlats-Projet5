import { tagFactory } from "../factories/tag.js";
import {recipeIncludeStringIngredients, recipeIncludeStringUstensils, recipeIncludeStringDevices } from "./sortRecipes.js";
import { sortRecipesAllCriterias } from "./searchBar.js";
import { currentRecipes, displayRecipes } from "./recipesDisplay.js";
import { recipes } from "../../data/recipe.js";

//Get DOM elements
const tagSection = document.querySelector('.tags_section');

//Keeps track of all active tags in an array to sort recipes faster
export let activeTags = [];

//Adds a tag to the tag section
export function addTag(tagData){
    activeTags.push(tagData);

    const tag = tagFactory(tagData);
    const tagDOM = tag.getTagDOM();
    tagSection.appendChild(tagDOM);

    //sort recipes that includes tag
    let sortedRecipes=[];
    switch (tagData.type) {
        case 'ingredient':
            currentRecipes.forEach((recipe)=>recipeIncludeStringIngredients(recipe, tagData.name.toLowerCase()) && sortedRecipes.push(recipe));
            break;
        case 'ustensil':
            currentRecipes.forEach((recipe)=>recipeIncludeStringUstensils(recipe, tagData.name.toLowerCase()) && sortedRecipes.push(recipe));
            break;
        case 'device':
            currentRecipes.forEach((recipe)=>recipeIncludeStringDevices(recipe, tagData.name.toLowerCase()) && sortedRecipes.push(recipe));
            break;
        default:
            console.log("Error : Tag type not covered");
    }
    displayRecipes(sortedRecipes);
}

//Removes a tag from the tag section
export function removeTag(tag, tagData){
    tag.remove();
    activeTags.splice(activeTags.indexOf(tagData), 1);

    //sort all recipes
    displayRecipes(sortRecipesAllCriterias(recipes));
}