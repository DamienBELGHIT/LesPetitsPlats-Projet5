import { addTag } from "../utils/tag.js";

//Factory function creating a tagList element in a tagList
export function tagListElementFactory(data){
    const {name, type} = data;
    
    function getTagListElementDOM(){
        const container = document.createElement("li");
        container.textContent = name;

        //Events adding a tag
        container.addEventListener("click", ()=>addTag({name:name, type:type}));

        return(container);
    }

    return {getTagListElementDOM};
}

