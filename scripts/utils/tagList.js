import { tagListElementFactory } from "../factories/tagListElement.js";

//Get DOM elements
const tagLists = document.querySelectorAll(".tagList");

//Increase/Decrease tagList's list width and changes placeholder
function setTagListWide(tagList, widen){
    //Wides tagList if there's more than 15 elements visible
    const MIN_ELEMENTS = 15;
    const tagList_elems = Array.prototype.slice.call(tagList.querySelectorAll("ul li"),0).filter(node => node.style.display !== "none");
    widen && (widen = (tagList_elems.length > MIN_ELEMENTS));

    const tagListInput = tagList.querySelector("input");
    tagListInput.placeholder = widen ? tagList.getAttribute("second-placeholder") : tagList.getAttribute("first-placeholder");
    tagList.setAttribute("widen", widen);
}

//Hides all tagLists list
function closeAllTagLists(){
    tagLists.forEach((tagList)=>displayTagList(tagList, false));
}

//Closes all tagLists when there's a click outside them
window.addEventListener("click", (e)=>{
  !(Array.from(tagLists).some((tagList) => tagList.contains(e.target))) && closeAllTagLists()
});

//Change the display style of the tagList list to block or none
function displayTagList(tagList, display){
    const arrow_icon = tagList.querySelector("i");
    const tagList_list = tagList.querySelector("ul");

    if(display){
        arrow_icon.classList.remove("fa-angle-down");
        arrow_icon.classList.add("fa-angle-up");
        tagList_list.style.display = "block";
        tagList.querySelector("input").focus();
        setTagListWide(tagList, true);
    }else{
        arrow_icon.classList.remove("fa-angle-up");
        arrow_icon.classList.add("fa-angle-down");
        tagList_list.style.display = "none";
        setTagListWide(tagList, false);
    }
}

//Toggles the tagList's list visibility
function toggleListVisibility(tagList){
  closeAllTagLists();
  const tagList_list = tagList.querySelector("ul");
  displayTagList(tagList, !(tagList_list.style.display === "block"));
}

//Arrays keeping tracks of all tagList elements to prevent doubles
let ingredientTagLists = [];
let deviceTagLists = [];
let ustensilTagLists = [];

//Deletes all tagLists elements
export function clearAllTagListsElements(){
  document.querySelectorAll(".tagList li").forEach((element)=>element.remove());
  ingredientTagLists = [];
  deviceTagLists = [];
  ustensilTagLists = [];
}


//Inserts a tagList element into a list
function addTagListElement(name, type, list){
  const tagListElementModel = tagListElementFactory({name:name.charAt(0).toUpperCase() + name.slice(1), type:type});
  const tagListElementDOM = tagListElementModel.getTagListElementDOM();
  list.appendChild(tagListElementDOM);
}

//Inserts all elements from a recipe to all tagList
export function addTagListsElements(recipe){
  //adds elements to ingredient tagList
  const tagListIngredient = document.getElementById("ingredient-tagList");
  const ingredientList = tagListIngredient.querySelector("ul");
  recipe.ingredients.forEach((ingredient)=>{
    const ingredientName = ingredient.ingredient;
    if(!ingredientTagLists.includes(ingredientName.toLowerCase())){
      ingredientTagLists.push(ingredientName.toLowerCase());
      addTagListElement(ingredientName, "ingredient", ingredientList);
    }
  });

  //adds elements to devices tagList
  const tagListDevice = document.getElementById("device-tagList");
  const deviceList = tagListDevice.querySelector("ul");
  const deviceName = recipe.appliance;
  if(!deviceTagLists.includes(deviceName.toLowerCase())){
    deviceTagLists.push(deviceName.toLowerCase());
    addTagListElement(deviceName, "device", deviceList);
  }

  //adds elements to ustensils tagList
  const tagListUstensil = document.getElementById("ustensil-tagList");
  const ustensilList = tagListUstensil.querySelector("ul");
  recipe.ustensils.forEach((ustensil)=>{
    if(!ustensilTagLists.includes(ustensil.toLowerCase())){
      ustensilTagLists.push(ustensil.toLowerCase());
      addTagListElement(ustensil, "ustensil", ustensilList);
    }
  });
}

//Initialization
tagLists.forEach((tagList)=>{
    const tagListInput = tagList.querySelector("input");

    //Set first-placeholder parameter to initial placeholder
    tagList.setAttribute("first-placeholder", tagListInput.placeholder);

    //Events expanding tagList
    tagList.addEventListener("click", ()=>{
      toggleListVisibility(tagList);
    });
    tagListInput.addEventListener("focus", ()=>{
      toggleListVisibility(tagList);
    });

    //Events making all tagList elements match input
    tagListInput.addEventListener("input",()=>
    {
        const tagListElems = tagList.querySelectorAll("ul li");
        tagListElems.forEach((tagListElem)=>{
        tagListElem.style.display = tagListElem.textContent.toLowerCase().includes(tagListInput.value.toLowerCase()) ? "block" : "none";        
        setTagListWide(tagList, true);
    })
    });
}) 