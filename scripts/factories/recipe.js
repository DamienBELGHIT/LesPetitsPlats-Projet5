//Factory function creating a recipe
export function recipeFactory(data){
    const {name, ingredients, time, description, appliance, ustensils} = data;

    function getRecipeCardDOM(){
        const article = document.createElement("article");
        article.classList.add("recipe");

        const section = document.createElement("section");

        const div_heading = document.createElement("div");
        div_heading.classList.add("recipe-heading");
        const div_desc = document.createElement("div");
        div_desc.classList.add("recipe-description");

        //thumbnail
        const div_thumbnail = document.createElement("div");
        div_thumbnail.classList.add("recipe-thumbnail");

        //name
        const div_title = document.createElement("h2");
        div_title.textContent = name;

        //duration
        const div_time = document.createElement("h2");
        div_time.classList.add("duration");
        const icon_timer = document.createElement("i");
        icon_timer.classList.add("fa-regular", "fa-clock");
        const time_txt = document.createElement("span");
        time_txt.textContent = " "+time + "min";
        div_time.appendChild(icon_timer);
        div_time.appendChild(time_txt);

        //ingredients
        const list_ingredients = document.createElement("ul");
        ingredients.forEach((ingredient)=>{
            const div_ingredient = document.createElement("li");

            const title_ingredient = document.createElement("span");
            title_ingredient.classList.add("ingredient-title");
            title_ingredient.textContent = ingredient.ingredient;
            (ingredient.quantity || ingredient.unit) && (title_ingredient.textContent += ": ");

            const desc_ingredient = document.createElement("span");
            desc_ingredient.textContent = (ingredient.quantity ? ingredient.quantity : "") +" "+ (ingredient.unit ? ingredient.unit : "");

            div_ingredient.appendChild(title_ingredient);
            div_ingredient.appendChild(desc_ingredient);
            list_ingredients.appendChild(div_ingredient);
        });

        //description
        const div_description = document.createElement("p");
        div_description.textContent = description;

        //assembling
        article.appendChild(div_thumbnail);
        div_heading.appendChild(div_title);
        div_heading.appendChild(div_time);
        div_desc.appendChild(list_ingredients);
        div_desc.appendChild(div_description);
        section.appendChild(div_heading);
        section.appendChild(div_desc);
        article.appendChild(section);
        
        return (article);
    }
    return {getRecipeCardDOM};
}