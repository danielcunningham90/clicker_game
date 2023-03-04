// Buttons werden initialisiert
const cta = {
    clicker: document.getElementById('clicker-button'),
    upgrade: {
        cpc: document.getElementById('upgrade-button-cpc')
    }
}

// Anzeigen werden initialisiert
const disp = {
    clicks: document.getElementById('current_clicks'),
    cpc: document.getElementById('current_cpc'),

    upgrade: {
        cpc: {
            cost: document.getElementById('upgrade_cpc_cost'),
            increase: document.getElementById('upgrade_cpc_increase')
        }
    }
}

// Current Stats
let current_clicks = 0;
let current_cpc = 1;

// Default Upgrade Stats
let upgradeCPC = {
    level: 1,
    cost: 50,
    increase: 1,
    costFactor: 2.5,
    increaseFactor: 1.5
}

// Anzeigen ausgeben
function drawDisplay() {
    disp.clicks.innerHTML = current_clicks;
    disp.cpc.innerHTML = current_cpc;
    disp.upgrade.cpc.cost.innerHTML = upgradeCPC.cost;
    disp.upgrade.cpc.increase.innerHTML = upgradeCPC.increase;

}

// Daten im localStorage speichern
function saveData() {
    localStorage.setItem('current_clicks', current_clicks);
    localStorage.setItem('current_cpc', current_cpc);
    localStorage.setItem('current_cpc_cost', upgradeCPC.cost);
    localStorage.setItem('current_cpc_level', upgradeCPC.level);
    localStorage.setItem('current_cpc_increase', upgradeCPC.increase);
}

// Daten aus dem localStorage abrufen
function loadData() {
    current_clicks = parseInt(localStorage.getItem('current_clicks'));
    current_cpc = parseInt(localStorage.getItem('current_cpc'));
    upgradeCPC.level = parseInt(localStorage.getItem('current_cpc_level'));
    upgradeCPC.cost = parseInt(localStorage.getItem('current_cpc_cost'));
    upgradeCPC.increase = parseInt(localStorage.getItem('current_cpc_increase'));
}

// Neues Spiel initialisieren
function newGame() {
    console.log("Neues Spiel wird initialisiert ...");
    saveData();
    drawDisplay();
}

// Vorhandenen Spielstand laden
function loadGame() {
    console.log("Spielstand wird geladen ...");
    loadData();
    drawDisplay();
}

// Clicker Event
function generateClick() {
    current_clicks += current_cpc;
    drawDisplay();
    saveData();
}

// Upgrade kaufen
function buyUpgrade() {
    // Abfrage ob Clicks ausreichend sind
    if(current_clicks >= upgradeCPC.cost) {
        console.log("Kauf erfolgreich")
        current_clicks -= upgradeCPC.cost;
        current_cpc += upgradeCPC.increase;
        upgradeCPC.level++;
        upgradeCPC.cost = Math.round(upgradeCPC.cost * upgradeCPC.costFactor);
        upgradeCPC.increase = Math.round(upgradeCPC.increase * upgradeCPC.increaseFactor);
        saveData();
        drawDisplay();
    } else {
        console.log("Kauf fehlgeschlagen")
    }
}

// Beim laden der Seite Spielstatus abfragen (true / false)
if ( localStorage.getItem('current_clicks') ) {
    loadGame();
} else {
    newGame();
}

// Eventlistener
cta.clicker.addEventListener('click', generateClick);
cta.upgrade.cpc.addEventListener('click', buyUpgrade);