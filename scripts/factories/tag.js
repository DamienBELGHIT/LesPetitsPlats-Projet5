import { removeTag } from "../utils/tag.js";

//Factory function creating a tag
export function tagFactory(data){
    const {name, type} = data;
    
    function getTagDOM(){
        const div_main = document.createElement("div");
        div_main.classList.add("tag");
        div_main.setAttribute("type-color",type);

        //name
        const div_name = document.createElement("span");
        div_name.textContent = name;

        //remove icon
        const icon_delete = document.createElement("i");
        icon_delete.classList.add("fa-regular", "fa-circle-xmark");
        icon_delete.addEventListener("click", ()=>removeTag(div_main, data));

        //assembling
        div_main.appendChild(div_name);
        div_main.appendChild(icon_delete);

        return (div_main);
    }

    return {getTagDOM};
}

