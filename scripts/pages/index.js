import { recipes } from "../../data/recipe.js";
import { displayRecipes } from "../utils/recipesDisplay.js";
import "../utils/tagList.js";
import "../utils/searchBar.js";

function init() {
  displayRecipes(recipes);
}

init();