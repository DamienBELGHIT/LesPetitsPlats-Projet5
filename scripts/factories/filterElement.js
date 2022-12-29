import { addTag } from "../utils/tag.js";

//Factory function creating a filter element in a filter list
export function filterElementFactory(data){
    const {name, type} = data;
    
    function getFilterDOM(){
        const container = document.createElement("li");
        container.textContent = name;

        //Events adding a tag
        container.addEventListener("click", ()=>addTag({name:name, type:type}));

        return(container);
    }

    return {getFilterDOM};
}

