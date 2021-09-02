// Chiedere all'utente di inserire il numero di celle di cui sarà composto il campo da gioco.
// Tramite una funzione javascript disegnare in pagina la griglia con massimo 10 celle per riga.
// Al click su una cella dovrà essere mostrato con un alert il numero della cella e il suo background diventerà rosso.

// Il computer deve generare 16 numeri casuali tra 1 e 100 (bombe).
// I numeri non possono essere duplicati.
// In seguito il giocatore clicca sulle celle numerate (non può cliccare più volte sulla stessa cella)
// La partita termina quando il giocatore clicca su un numero “vietato” o clicca su tutte le celle che non sono delle bombe.
// Al termine della partita il software deve comunicare il punteggio.
// BONUS: (da fare solo se funziona tutto il resto)
// all’inizio il software richiede anche una difficoltà all’utente che cambia il range di numeri casuali:
// con difficoltà 0 => tra 1 e 100
// con difficoltà 1 => tra 1 e 80
// con difficoltà 2 => tra 1 e 50

// versione con tra 1 e 20 e 3 bombe 


// FUNZIONI 

// creo la funzione che disegna in pagina la griglia con massimo 10 celle per riga

function griglia10 (celle) {
    for (var i = 1; i <= celle; i++) {
        let campo = document.getElementById("campo");
        campo.innerHTML += `<div class="cella">${i}</div>`;
    }
}

// 1. creo la funzione che genera un numero random 

function numeroRandom (min, max) {
    return Math.floor( Math.random() * (max - min + 1) ) + min;
}

// PROGRAMMA PRINCIPALE

// 2. creo l'array bombe 

var bombe = [];

// 3. fino a quando la lunghezza dell'array è minore di 3, genero un numero casuale, se non è presente nell'array lo pusho dentro l'array 

while (bombe.length < 3) {
    var numeroCasuale = numeroRandom(1, 10);
    if (bombe.includes(numeroCasuale) == false) {
        bombe.push(numeroCasuale);
    }
}

console.log(bombe);

// 4. creo un evento click su una cella che mostra il contenuto della stessa e cambia il colore di background in rosso 

let celleUtente = [];

let numeroCelle = 10;

console.log(bombe.length);

let celleLibere = numeroCelle - bombe.length;
console.log(celleLibere);

let scelta = 0;

griglia10(numeroCelle);

let campo = document.getElementById("campo");
let clicks = 0;

campo.addEventListener(`click`,
    function(evento) {
        scelta += 1; 
        clicks += 1;
        let sceltaUtente = parseInt(evento.target.innerHTML);
        while (bombe.includes(sceltaUtente) == true) {
            evento.target.classList.add("bomba-img");
            alert("BOMBA! BOOM! SEI ESPLOSO!");
            clicks -=1;
            return alert("Il tuo punteggio è: " + clicks);
        } 

        if (bombe.includes(sceltaUtente) == false && scelta < celleLibere) {
            evento.target.classList.add("bg-lightgreen");
            alert("Bravo non hai beccato nessuna bomba! Continua cosi!");
            } 
            
        if (scelta == celleLibere) {
            evento.target.classList.add("bg-lightgreen");
            alert("HAI VINTO! NON HAI BECCATO NESSUNA BOMBA!");
            return alert("Il tuo punteggio è: " + clicks); 
        } 
    } 
);