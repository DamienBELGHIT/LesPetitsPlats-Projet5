//Returns all recipes that include a certain string in an array
export function sortRecipesGlobal(recipes, string){
    string = string.toLowerCase();
    const sortedRecipes = recipes.filter(recipe => (
        recipe.name.toLowerCase().includes(string) 
        || recipe.description.toLowerCase().includes(string) 
        || recipeIncludeStringDevices(recipe, string, false) 
        || recipeIncludeStringIngredients(recipe, string, false) 
        || recipeIncludeStringUstensils(recipe, string, false)));
    return sortedRecipes;
}

//Returns true if the recipe includes a certain string in their ingredients, false otherwise
export function recipeIncludeStringIngredients(recipe, string, fullMatch){
    return (recipe.ingredients.some(e => fullMatch ? (e.ingredient.toLowerCase() === string) : (e.ingredient.toLowerCase().includes(string))));
}

//Returns true if the recipe includes a certain string in their ustensils, false otherwise
export function recipeIncludeStringUstensils(recipe, string, fullMatch){
    return (recipe.ustensils.some(e => fullMatch ? (e.toLowerCase() === string) : (e.toLowerCase().includes(string))));
}

//Returns true if the recipe includes a certain string in their devices, false otherwise
export function recipeIncludeStringDevices(recipe, string, fullMatch){
    const deviceName = recipe.appliance.toLowerCase();
    return fullMatch ? (deviceName === string) : (deviceName.includes(string));
}