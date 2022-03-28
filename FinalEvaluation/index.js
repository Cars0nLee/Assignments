const domSelectors = {
    searchBtn: ".search_btn",
    searchInput: ".search-bar",
    result: ".result",
    loading: ".loading"
}

const api ={
    key: "75bc45ce5b3dbb150646db31f98aea22",
    base: "https://api.openweathermap.org/data/2.5/"
}

function generateResult(weather, temp) {
    let f = Math.round(((temp*(9/5))+32));
    return `<h2>${f}</h2><br><h2>${weather}</h2>`
}

function renderResult(data) {
    const ele = document.querySelector(domSelectors.result);
    const temp = generateResult(data.weather[0].main, data.main.temp);
    render(ele, temp)
}

function setUpEvent(){
    document.querySelector(domSelectors.searchBtn).addEventListener("click", (e)=>{
        const ele = document.querySelector(domSelectors.searchInput);
        if(ele.value == ""){
            alert("ERROR: Please enter city.");
        }
        else {
            return getSearch(ele.value).then((data) => {renderResult(data)});
        }
    })
}

function render(ele, temp) {
    ele.innerHTML = temp;
}

// Get
function getSearch(query) {
    return fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`).then(res=>res.json())
}

setUpEvent()

// getSearch("chantilly").then((data) => {renderResult(data)});

