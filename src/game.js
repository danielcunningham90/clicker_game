const cta = {
    clicker: document.getElementById('clicker-button')
}

const disp = {
    clicks: document.getElementById('current_clicks'),
    cpc: document.getElementById('current_cpc')
}

let current_clicks = 0;
let current_cpc = 1;


function drawDisplay() {
    disp.clicks.innerHTML = current_clicks;
    disp.cpc.innerHTML = current_cpc;
}

function saveData() {
    localStorage.setItem('current_clicks', current_clicks);
    localStorage.setItem('current_cpc', current_cpc);
}

function loadData() {
    current_clicks = parseInt(localStorage.getItem('current_clicks'));
    current_cpc = parseInt(localStorage.getItem('current_cpc'));
}

function newGame() {
    console.log("Neues Spiel wird initialisiert ...");
    saveData();
    drawDisplay();
}

function loadGame() {
    console.log("Spielstand wird geladen ...");
    loadData();
    drawDisplay();
}

function generateClick() {
    current_clicks += current_cpc;
    drawDisplay();
    saveData();
}



if ( localStorage.getItem('current_clicks') ) {
    loadGame();
} else {
    newGame();
}

cta.clicker.addEventListener('click', generateClick);