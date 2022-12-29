import { tagFactory } from "../factories/tag.js";

//Get DOM elements
const filters = document.querySelectorAll(".filter");
const tagSection = document.querySelector('.tags_section');

//Closes all filter lists when there's a click outside them
window.addEventListener("click", (e)=>{
    !(Array.from(filters).some((filter) => filter.contains(e.target))) && closeAllFilterLists()
});

//Expands filter list on click
filters.forEach((filter)=>{
    filter.addEventListener("click", ()=>{
        closeAllFilterLists();
        const filter_list = filter.querySelector("ul");
        displayFilterList(filter, !(filter_list.style.display === "block"));
    });
})

//Changes all filter lists display to none 
function closeAllFilterLists(){
    filters.forEach((filter)=>displayFilterList(filter, false));
}

//Change the display style of the filter list to block or none depending on boolean parameter
function displayFilterList(filter, display){
    const arrow_icon = filter.querySelector("i");
    const filter_list = filter.querySelector("ul");
    if(display){
        arrow_icon.classList.remove("fa-angle-down");
        arrow_icon.classList.add("fa-angle-up");
        filter_list.style.display = "block";
        filter.querySelector("input").focus();
    }else{
        arrow_icon.classList.remove("fa-angle-up");
        arrow_icon.classList.add("fa-angle-down");
        filter_list.style.display = "none";
    }
}

//Adds a tag to the search bar
function addTag(tagData){
  const tag = tagFactory(tagData);
  const tagDOM = tag.getTagDOM();
  tagSection.appendChild(tagDOM);
}
  
//Events adding tags to main search bar
filters.forEach((filter) => {
    const filterElems = filter.querySelectorAll("ul li");
    filterElems.forEach((filterElem)=>{
        filterElem.addEventListener("click", ()=>addTag({name:filterElem.textContent, type:filter.getAttribute("type-color")}));
    })
});

//Events changing the filters lists when the input changes to match the input
filters.forEach((filter) => {
    const filterInput = filter.querySelector("input");
    const filterElems = filter.querySelectorAll("ul li");

    filterInput.addEventListener("input",()=>filterElems.forEach((filterElem)=>{
        filterElem.style.display = filterElem.textContent.toLowerCase().includes(filterInput.value.toLowerCase()) ? "block" : "none";
    }));
});