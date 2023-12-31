const accessKey = "dcT72lzEnKMy_eV_W5wc8uYdwwk7-XUk2I4I2DpmStE";

const formEl = document.querySelector("form");
const searchInputEl = document.getElementById("search-input");

const searchResultsEl = document.querySelector(".search-results");
const showMoreButtonEl = document.getElementById("show-more-button");

let inputData = "";
let page = 1;

async function searchImages(){
    inputData = searchInputEl.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;
    
    const response = await fetch(url); //await is going to the response call from the api and then continue to the next line in the code
    const data = await response.json();
    
    if(page === 1) {
        searchResultsEl.innerHTML = "";
    }
    const results = data.results;

    page++;
    
    if(page > 1){
        showMoreButtonEl.style.display = "block";
    }

    results.map((result)=>{
        const imageWrapper = document.createElement("div"); //creates div element
        imageWrapper.classList.add("search-result");

        const image = document.createElement("img"); //creates img element
        image.src = result.urls.small;
        image.alt = result.alt_description;

        const imageLink = document.createElement("a"); //creates a
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description; //sets the text of the <a> tag

        imageWrapper.appendChild(image); // putting the img tag inside the div tag
        imageWrapper.appendChild(imageLink);// putting the a tag inside  the div tag

        searchResultsEl.appendChild(imageWrapper); //putting the "search-result" div inside the "search-results" div
    });
}

formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    page = 1;
    searchImages();
});

showMoreButtonEl.addEventListener("click", ()=>{
    searchImages();
})