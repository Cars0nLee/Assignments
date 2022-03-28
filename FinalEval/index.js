const domSelectors ={
    result: ".result",
    searchBtn: ".search_btn",
    searchInput: ".search-bar",
    resultTotal: ".total-result"
}

function generateSearch(data){
    let result = data.results;
    return result.map(data=>{
        return `<img src="${data.artworkUrl100}" /> <h3>${data.collectionName}</h3>`
    }).join("");
}

function renderSearch(data){
    const ele = document.querySelector(domSelectors.result);
    const temp = generateSearch(data);
    render(ele, temp)
}

function generateTotal(data){
    return `<h2>${data.results.length} results</h2>`
}

function renderTotal(data){
    const ele = document.querySelector(domSelectors.resultTotal);
    const temp = generateTotal(data);
    render(ele, temp);
}

function renderAlbums(data){
    const ele = document.querySelector(domSelectors.result);
    const temp = generateSearch(data);
    render(ele, temp);
}

function getSearch(query) {
    return fetch(`https://itunes.apple.com/search?term=${query}&media=music&entity=album&attribute=artistTerm&limit=200`).then(res=>res.json())
}

function setUpEvent(){
    document.querySelector(domSelectors.searchBtn).addEventListener("click", (e)=>{
        const ele = document.querySelector(domSelectors.searchInput);
        if(ele.value == ""){
            alert("ERROR: Please enter artist.");
        }
        else {
            return getSearch(ele.value).then((data) => {
                renderAlbums(data);
                renderTotal(data);
                renderSearch(data);
            });
        }
    })
}

function render(ele, temp) {
    ele.innerHTML = temp;
}

setUpEvent();