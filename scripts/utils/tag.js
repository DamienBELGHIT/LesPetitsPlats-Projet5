import { tagFactory } from "../factories/tag.js";

//Get DOM elements
const tagSection = document.querySelector('.tags_section');

//Adds a tag to the search bar
export function addTag(tagData){
    const tag = tagFactory(tagData);
    const tagDOM = tag.getTagDOM();
    tagSection.appendChild(tagDOM);
}