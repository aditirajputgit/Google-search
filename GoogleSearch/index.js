const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");
const spinner = document.getElementById("spinner");

function createElementForSearchResult(result){
    let { link, title, description } = result;
    //Div Container 
    let resultItemEl = document.createElement("div");
    resultItemEl.classList.add("result-item");
    //Anchor HTMLTitle
    let titleElement = document.createElement("a");
    titleElement.href = link;
    titleElement.textContent = title;
    titleElement.classList.add("result-title");
    titleElement.target = "_blank";
    resultItemEl.appendChild(titleElement);
    //break title
    const br = document.createElement("br");
    resultItemEl.appendChild(br);
    //anchor url - result -url 
    let urlEl = document.createElement("a");
      urlEl.classList.add("result-url");
      urlEl.href = link;
      urlEl.target = "_blank";
      urlEl.textContent = link;
      resultItemEl.appendChild(urlEl);
    //line break
    const brs = document.createElement("br");
    resultItemEl.appendChild(brs)
    //para description 
    
    let descriptionEl = document.createElement("p");
  descriptionEl.classList.add("link-description");
  descriptionEl.textContent = description;
  resultItemEl.appendChild(descriptionEl);
    
    searchResults.appendChild(resultItemEl);
}

function  displayResults(search_result){
     spinner.classList.toggle("d-none");
    for(let result of search_result ){
        createElementForSearchResult(result);
    }
    
}

function wifiPediaSearch(event){
    if(event.key === "Enter"){
        spinner.classList.toggle("d-none");
        let searchInputValue = searchInput.value;
       searchResults.textContent = "";
         let url = "https://apis.ccbp.in/wiki-search?search=" + searchInputValue;
         let options = {
             method:"GET"
         }
         fetch( url, options)
         .then(function(response){
             return response.json();
         })
         .then(function(jsonData){
              let { search_results } = jsonData;
            displayResults(search_results);
         });
    }
}

searchInput.addEventListener("keydown" , wifiPediaSearch);