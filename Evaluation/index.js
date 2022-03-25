const domSelectors = {
    movieCard: ".movie-info",
    btnContainerLeft: ".btn_container_left",
    btnContainerRight: ".btn_container_right",
    buttonLeft: ".btn-left",
    buttonRight: ".btn-right"
}

let position = 0;

// Movie card
function generateCard(data){
    return data.map(card=>{
        return `<div class="movie-card">
        <img src="${card.imgUrl}" alt="picture" class="movie-card_image"/>
        <h2 class="movie-card_title">${card.name}</h2>
        <p class="movie-card_info">${card.outlineInfo}</p></div>`
    }).join("");
}

function renderCard(data){
    console.log(data)
    const ele = document.querySelector(domSelectors.movieCard);
    const temp = generateCard(data);
    render(ele, temp);
}

// Buttons
function generateButtonLeft(){
    let leftBtn = position == 0 ? "hidden" : "";
    return `<button class="btn-left" ${leftBtn}><</button>`
}

function generateButtonRight(){
    let rightBtn = position == 5 ? "hidden" : "";
    return `<button class="btn-right" ${rightBtn}>></button>`
}

function rednerBtnRight(){
    const ele = document.querySelector(domSelectors.btnContainerRight);
    const btnRight = generateButtonRight();
    render(ele, btnRight);
}

function renderBtnLeft(){
    const ele = document.querySelector(domSelectors.btnContainerLeft);
    const btnLeft = generateButtonLeft();
    render(ele, btnLeft);
}

function setUpEvent(){
    document.querySelector(domSelectors.btnContainerRight).addEventListener("click", (e)=>{
        position += 1;
        getData().then(data=>{
            renderBtnLeft();
            rednerBtnRight();
            renderCard(data.slice(position, position+4))
        });
    })

    document.querySelector(domSelectors.btnContainerLeft).addEventListener("click", (e)=>{
        position -= 1;
        getData().then(data=>{
            renderBtnLeft();
            rednerBtnRight();
            renderCard(data.slice(position, position+4));
        });
    })
}

function getData(){
    return fetch('http://localhost:3000/movies')
    .then(response => response.json())
}

function render(ele, temp){
    ele.innerHTML = temp;
}

// init
getData().then(data=>{
    rednerBtnRight();
    renderBtnLeft();
    renderCard(data.slice(position, position+4))
});

setUpEvent();