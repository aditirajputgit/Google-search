const resultCountries = document.getElementById("resultCountries");
const searchInput = document.getElementById("searchInput");
const spinner = document.getElementById("spinner");

let countriesList = []
let searchInputval = "";

function createResult(result){
    let {flag,name,population} = result;
    const countryEl = document.createElement("div");
    countryEl.classList.add("country-card","col-11","col-md-5","mr-auto","d-flex","flex-row","ml-auto")
    resultCountries.appendChild(countryEl);
    
    //flag
    const flagImage = document.createElement("img");
    flagImage.src = flag;
    flagImage.classList.add("country-flag","mt-auto","mb-auto")
    countryEl.appendChild(flagImage)
    let countryInfo = document.createElement("div");
    countryInfo.classList.add("d-flex","flex-column" ,"ml-4");
    countryEl.appendChild(countryInfo);
    //name
    const countryName = document.createElement("p");
    countryName.textContent = name;
    countryName.classList.add("country-name");
    countryInfo.appendChild(countryName);
    //population
    const countryPop = document.createElement("p");
    countryPop.textContent = population;
    countryPop.classList.add("country-population");
    countryInfo.appendChild(countryPop);
    
}

function  displaySearchResult(){
    resultCountries.textContent = "";
   for(let result of countriesList){
       let countryName = result.name;
       if(countryName.includes(searchInputval)){
           createResult(result);
       }
   }
   
}

function getResultCountries(){
    let option = {
        method : "GET"
    }
    spinner.classList.toggle("d-none");
    fetch("https://apis.ccbp.in/countries-data",option)
    .then(function(response){
        return response.json()
    })
    .then(function(jsonData){
        countriesList = jsonData;
        spinner.classList.toggle("d-none");
        displaySearchResult(countriesList);
    })
}

function onChangeSEarchInput(event){
    searchInputval = event.target.value;
    console.log(searchInputval);
    displaySearchResult()
}

getResultCountries()
searchInput.addEventListener("keyup",onChangeSEarchInput);