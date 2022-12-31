//Get DOM elements
const filters = document.querySelectorAll(".filter");

//Set first-placeholder parameter to initial placeholder
filters.forEach((filter)=>{
    const filterInput = filter.querySelector("input");
    filter.setAttribute("first-placeholder", filterInput.placeholder);
})

//Increase/Decrease filter list size and changes placeholder
function setFilterWide(filter, widen){
    const filterInput = filter.querySelector("input");
    filterInput.placeholder = widen ? filter.getAttribute("second-placeholder") : filter.getAttribute("first-placeholder");
    filter.setAttribute("widen", widen);
}

//Closes all filter lists when there's a click outside them
window.addEventListener("click", (e)=>{
    !(Array.from(filters).some((filter) => filter.contains(e.target))) && closeAllFilterLists()
});

//Events expanding filter list on click
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

//Change the display style of the filter list to block or none
function displayFilterList(filter, display){
    const arrow_icon = filter.querySelector("i");
    const filter_list = filter.querySelector("ul");
    const filterInput = filter.querySelector("input");

    if(display){
        arrow_icon.classList.remove("fa-angle-down");
        arrow_icon.classList.add("fa-angle-up");
        filter_list.style.display = "block";
        filter.querySelector("input").focus();
        (filterInput.value.length < 2) && setFilterWide(filter, true);
    }else{
        arrow_icon.classList.remove("fa-angle-up");
        arrow_icon.classList.add("fa-angle-down");
        filter_list.style.display = "none";
        setFilterWide(filter, false);
    }
}

//Events changing the filters lists when the input changes to match the input
filters.forEach((filter) => {
    const filterInput = filter.querySelector("input");
    filterInput.addEventListener("input",()=>
    {
        const filterElems = filter.querySelectorAll("ul li");
        filterElems.forEach((filterElem)=>{
        filterElem.style.display = filterElem.textContent.toLowerCase().includes(filterInput.value.toLowerCase()) ? "block" : "none";
        setFilterWide(filter, (filterInput.value.length < 2) );
    })
    });
});