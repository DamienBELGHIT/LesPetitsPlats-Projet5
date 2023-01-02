//Returns all recipes that include a certain string in an array
export function sortRecipesGlobal(recipes, string){
    string = string.toLowerCase();
    let sortedRecipes = [];
    for (let i = 0; i < recipes.length; i++) {
        let found = false;
        if(recipes[i].name.toLowerCase().includes(string) || recipes[i].description.toLowerCase().includes(string) || recipeIncludeStringDevices(recipes[i], string, false)){
            found = true;
        }else{
            found = (recipeIncludeStringIngredients(recipes[i], string, false)) ? true : recipeIncludeStringUstensils(recipes[i], string, false);
        }
        found && sortedRecipes.push(recipes[i]);
    }
    return sortedRecipes;
}

//Returns true if the recipe includes a certain string in their ingredients, false otherwise
export function recipeIncludeStringIngredients(recipe, string, fullMatch){
    let found = false;
    let i = 0;
    while(!found && i < recipe.ingredients.length){
        const ingredientName = recipe.ingredients[i].ingredient.toLowerCase();
        found = fullMatch ? (ingredientName === string) : (ingredientName.includes(string));
        i++;
    }
    return found;
}

//Returns true if the recipe includes a certain string in their ustensils, false otherwise
export function recipeIncludeStringUstensils(recipe, string, fullMatch){
    let found = false;
    let i = 0;
    while(!found && i < recipe.ustensils.length){
        const ustensilName = recipe.ustensils[i].toLowerCase();
        found = fullMatch ? (ustensilName === string) : (ustensilName.includes(string));
        i++;
    }
    return found;
}

//Returns true if the recipe includes a certain string in their devices, false otherwise
export function recipeIncludeStringDevices(recipe, string, fullMatch){
    const deviceName = recipe.appliance.toLowerCase();
    return fullMatch ? (deviceName === string) : (deviceName.includes(string));
}