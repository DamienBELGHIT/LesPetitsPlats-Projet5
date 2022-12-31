//Returns all recipes that include a certain string in an array
export function sortRecipesGlobal(recipes, string){
    string = string.toLowerCase();
    let sortedRecipes = [];
    for (let i = 0; i < recipes.length; i++) {
        let found = false;
        if(recipes[i].name.toLowerCase().includes(string) || recipes[i].description.toLowerCase().includes(string) + recipes[i].appliance.toLowerCase().includes(string)){
            found = true;
        }else{
            found = (recipeIncludeStringIngredients(recipes[i], string)) ? true : recipeIncludeStringUstensils(recipes[i], string);
        }
        found && sortedRecipes.push(recipes[i]);
    }
    return sortedRecipes;
}

//Returns true if the recipe includes a certain string in their ingredients, false otherwise
export function recipeIncludeStringIngredients(recipe, string){
    let found = false;
    let i = 0;
    while(!found && i < recipe.ingredients.length){
        if(recipe.ingredients[i].ingredient.toLowerCase().includes(string)){
            found = true;
        }
        i++;
    }
    return found;
}

//Returns true if the recipe includes a certain string in their ustensils, false otherwise
export function recipeIncludeStringUstensils(recipe, string){
    let found = false;
    let i = 0;
    while(!found && i < recipe.ustensils.length){
        if(recipe.ustensils[i].toLowerCase().includes(string)){
            found = true;
        }
        i++;
    }
    return found;
}