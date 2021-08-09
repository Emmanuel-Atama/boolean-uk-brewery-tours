// INSTRUCTIONS
// - Download the files from https://codesandbox.io/s/js-exercise-brewery-tour-starter-template-whq5i?file=/templates/main-section.html
// - Read the "Open Brewery DB" documentation: https://www.openbrewerydb.org/documentation/01-listbreweries
// - Think about which request type to use
// - Create a state object
// - Create a fetch function to get data
// - Create action functions that update state
// - Create render functions that read from state

let state = {
  selectStateInput: "",
  breweries: [],
  cities: [],
  filters: {
    type: "",
    city: [],
    search: ""
  }
};

const stateFormEl = document.querySelector ("#select-state-form")
console.log("inside stateFormEl: ", stateFormEl)

function fetchSection () {
  stateFormEl.addEventListener("submit", (event) => {
    event.preventDefault()
    
    const stateInput = stateFormEl.querySelector("#select-state")
    console.log("stateInput: ", stateInput.value)
  
    const byStates = stateInput.value
    
    const url = `https://api.openbrewerydb.org/breweries?by_state=${byStates}&per_page=50`
    // console.log("Inside byStates: ", byStates)
    fetch(url)
    .then((res) => res.json())
    .then((newState) => {
      console.log("Inside GET Fetch: ", newState);
      state = {
        ...state,
        breweries: newState
      };
      renderBreweriesList(newState)
      renderFilterByType(newState)
      renderFilterByCity(newState)
      renderBreweriesSearchSection ()
    })  
    stateFormEl.reset()
  })
}
fetchSection()

const mainEl = document.querySelector("main")
console.log("Inside mainEl: ", mainEl)

function renderBreweriesSearchSection () {
 
  const searchTitleEl = document.createElement("h1");
  searchTitleEl.innerText = "List Of Breweries";
  mainEl.append(searchTitleEl);

  const searchheaderEl = document.createElement("header");
  searchheaderEl.className = "search-bar";
  mainEl.append(searchheaderEl);

  const searchFormEl = document.createElement("form");
  searchFormEl.id = "search-breweries-form";
  searchFormEl.autocomplete = "off";
  searchheaderEl.append(searchFormEl);

  const searchLabelEl = document.createElement("label");
  searchLabelEl.for = "search-breweries";
  searchFormEl.append(searchLabelEl);

  const searchh2El = document.createElement("h2");
  searchh2El.innerText = "Search breweries:";
  searchLabelEl.append(searchh2El);

  const searchInputEL = document.createElement("input");
  searchInputEL.id = "search-breweries";
  searchInputEL.name = "search-breweries";
  searchInputEL.type = "text";
  searchFormEl.append(searchInputEL);

}

function renderBreweriesList(stateBrews) {
mainEl.innerHTML = ""

  const searchArticleEl = document.createElement("article");
  mainEl.append(searchArticleEl);

  const ulEl = document.createElement("ul");
  ulEl.className = "breweries-list";
  searchArticleEl.append(ulEl);

  for (let i = 0; i < stateBrews.length; i++) {
    const stateBrew = stateBrews[i];
    // console.log("stateBrew: ", stateBrew)

    const ListEl = document.createElement("li");
    ulEl.append(ListEl);

    const listh2El = document.createElement("h2");
    listh2El.innerText = stateBrew.name;
    ListEl.append(listh2El);

    const frameEl = document.createElement("div");
    frameEl.className = "type";
    frameEl.innerText = stateBrew.brewery_type;
    ListEl.append(frameEl);

    const listSectionEl = document.createElement("section");
    listSectionEl.className = "address";
    listSectionEl.innerText = "Address:";
    ListEl.append(listSectionEl);

    const listh3El = document.createElement("h3");
    listh3El.innerText = stateBrew.address_3;
    listSectionEl.append(listh3El);

    const paragraphEl = document.createElement("p");
    paragraphEl.innerText = stateBrew.street;
    listSectionEl.append(paragraphEl);

    const paragraphEl1 = document.createElement("p");
    listSectionEl.append(paragraphEl1);

    const strongEl = document.createElement("strong");
    strongEl.innerText = stateBrew.city + " , " + stateBrew.postal_code;
    paragraphEl1.append(strongEl);

    const searchSectionEl2 = document.createElement("section");
    searchSectionEl2.className = "phone";
    ListEl.append(searchSectionEl2);
    const listh3El2 = document.createElement("h3");
    listh3El2.innerText = "Phone";

    searchSectionEl2.append(listh3El2);
    const paragraphEl2 = document.createElement("p");
    paragraphEl2.innerText = stateBrew.phone;
    searchSectionEl2.append(paragraphEl2);

    const searchSectionEl3 = document.createElement("section");
    searchSectionEl3.className = "link";
    ListEl.append(searchSectionEl3);

    const anchorEl = document.createElement("a");
    anchorEl.href = stateBrew.website_url;
    anchorEl.target = "_blank";
    anchorEl.innerText = "Visit Website";
    searchSectionEl3.append(anchorEl);
}
}

function renderFilterByType() {
  const asideEl = document.createElement("aside");
  asideEl.className = "filters-section";
  mainEl.append(asideEl);

  const h2El = document.createElement("h2");
  h2El.innerText = "Filter By";
  asideEl.append(h2El);

  const filterFormEl = document.createElement("form");
  filterFormEl.id = "filter-by-type-form";
  filterFormEl.autocomplete = "off";
  asideEl.append(filterFormEl);

  const filterLabelEl = document.createElement("label");
  filterLabelEl.for = "filter-by-type";
  filterFormEl.append(filterLabelEl);

  const filterh3El = document.createElement("h3");
  filterh3El.innerText = "Type of Brewery";
  filterLabelEl.append(filterh3El);

  const filterSelectEl = document.createElement("select");
  filterSelectEl.name = "filter-by-type";
  filterSelectEl.id = "filter-by-type";
filterSelectEl.addEventListener("change", (event) => {
  const filterByTypeValue = event.target.value;
  state = {
    ...state,
    filters: {
...state.filters,
type: filterByTypeValue
    }
  }
  let filteredBreweries = state.breweries
  if (state.filters.type !=="") { 
    filteredBreweries = state.breweries.filter(
    (brewery) => brewery["brewery_type"] === state.filters.type
  );}
console.log(filteredBreweries, state.filters.type);

console.log("Inside filterSelerEl: ", state)
mainEl.innerHTML = "";
renderBreweriesSearchSection()
renderBreweriesList(filteredBreweries)
renderFilterByType();
renderFilterByCity(filteredBreweries);

})
  filterFormEl.append(filterSelectEl);

  const optionEl1 = document.createElement("option");
  optionEl1.value = "";
  optionEl1.innerText = "Select a type...";
  filterSelectEl.append(optionEl1);

  const optionEl2 = document.createElement("option");
  optionEl2.value = "micro";
  optionEl2.innerText = "Micro";
  if (state.filters.type === optionEl2.value) {
    optionEl2.selected = true;
  }
filterSelectEl.append(optionEl2);

  const optionEl3 = document.createElement("option");
  optionEl3.value = "regional";
  optionEl3.innerText = "Regional";
  if (state.filters.type === optionEl3.value) {
    optionEl3.selected = true;
  }
  filterSelectEl.append(optionEl3);

  const optionEl4 = document.createElement("option");
  optionEl4.value = "brewpub";
  optionEl4.innerText = "Brewpub";
  if (state.filters.type === optionEl4.value) {
    optionEl4.selected = true;
  }
  filterSelectEl.append(optionEl4);
}

function renderFilterByCity (cityFilters) {
  const asideEl = document.querySelector(".filters-section")

  const filterDivEl = document.createElement("div");
  filterDivEl.className = "filter-by-city-heading";
  asideEl.append(filterDivEl);

  const divTitleEl = document.createElement("h3");
  divTitleEl.innerText = "Cities";
  filterDivEl.append(divTitleEl);

  const divButtonEl = document.createElement("button");
  divButtonEl.className = "clear-all-btn";
  divButtonEl.innerText = "clear all";
  
divButtonEl.addEventListener("click", (event) => {
  console.log("Clicked")
})
  filterDivEl.append(divButtonEl);

  const filterByCityFormEl = document.createElement("form");
  filterByCityFormEl.id = "filter-by-city-form";
  asideEl.append(filterByCityFormEl);

  for (let i = 0; i < cityFilters.length; i++) {
    const cityFilter = cityFilters[i]

    const inputEl = document.createElement("input");
    inputEl.type = "checkbox";
    inputEl.name = cityFilter.city;
    inputEl.value = cityFilter.city;

    filterByCityFormEl.append(inputEl);
  
    const labelEl = document.createElement("label");
    labelEl.for = cityFilter.city;
    labelEl.innerText = cityFilter.city;
    filterByCityFormEl.append(labelEl);
  } 
}


// function extractCityData () {

// }
// extractCityData()