//Get DOM elements
const tagLists = document.querySelectorAll(".tagList");

//Increase/Decrease tagList list size and changes placeholder
function setTagListWide(tagList, widen){
    const tagListInput = tagList.querySelector("input");
    tagListInput.placeholder = widen ? tagList.getAttribute("second-placeholder") : tagList.getAttribute("first-placeholder");
    tagList.setAttribute("widen", widen);
}

//Closes all tagList lists when there's a click outside them
window.addEventListener("click", (e)=>{
    !(Array.from(tagLists).some((tagList) => tagList.contains(e.target))) && closeAllTagLists()
});

//Expands a tagList list
function expandList(tagList){
    closeAllTagLists();
    const tagList_list = tagList.querySelector("ul");
    displayTagList(tagList, !(tagList_list.style.display === "block"));
}

//Changes all tagList lists display to none 
function closeAllTagLists(){
    tagLists.forEach((tagList)=>displayTagList(tagList, false));
}

//Change the display style of the tagList list to block or none
function displayTagList(tagList, display){
    const arrow_icon = tagList.querySelector("i");
    const tagList_list = tagList.querySelector("ul");
    const tagListInput = tagList.querySelector("input");

    if(display){
        arrow_icon.classList.remove("fa-angle-down");
        arrow_icon.classList.add("fa-angle-up");
        tagList_list.style.display = "block";
        tagList.querySelector("input").focus();
        (tagListInput.value.length < 2) && setTagListWide(tagList, true);
    }else{
        arrow_icon.classList.remove("fa-angle-up");
        arrow_icon.classList.add("fa-angle-down");
        tagList_list.style.display = "none";
        setTagListWide(tagList, false);
    }
}

tagLists.forEach((tagList)=>{
    const tagListInput = tagList.querySelector("input");
    
    //Set first-placeholder parameter to initial placeholder
    tagList.setAttribute("first-placeholder", tagListInput.placeholder);

    //Events expanding tagList
    tagList.addEventListener("click", ()=>{
        expandList(tagList);
    });
    tagListInput.addEventListener("focus", ()=>{
        expandList(tagList);
    });

    //Events making all tagList elements match input
    tagListInput.addEventListener("input",()=>
    {
        const tagListElems = tagList.querySelectorAll("ul li");
        tagListElems.forEach((tagListElem)=>{
        tagListElem.style.display = tagListElem.textContent.toLowerCase().includes(tagListInput.value.toLowerCase()) ? "block" : "none";
        setTagListWide(tagList, (tagListInput.value.length < 2) );
    })
    });
})
