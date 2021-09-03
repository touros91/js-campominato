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
    let campo = document.getElementById("campo");
    campo.innerHTML = "";
    for (var i = 1; i <= celle; i++) {
        campo.innerHTML += `<div class="cella">${i}</div>`;
    }
}

// 1. creo la funzione che genera un numero random

function numeroRandom (min, max) {
    return Math.floor( Math.random() * (max - min + 1) ) + min;
}

// PROGRAMMA PRINCIPALE

// 2. creo l'array bombe (16)

var bombe = [];

// 3. fino a quando la lunghezza dell'array è minore di 16, genero un numero casuale, se non è presente nell'array lo pusho dentro l'array 

while (bombe.length < 16) {
    var numeroCasuale = numeroRandom(1, 100);
    if (bombe.includes(numeroCasuale) == false) {
        bombe.push(numeroCasuale);
    }
}

console.log(bombe);

// 4. creo un evento click che esegue i controlli se una cella è già stata cliccata, altrimenti controlla se la cella cliccata è una bomba e se lo è dichiara il punteggio fino a quel punto, se non è una bomba incrementa il punteggio e colora la cella di verde e una volta che tutte le celle senza bomba sono cliccate dichiara il punteggio finale

//BONUS: chiedo all'utente di inserire il livello di difficoltà ed in base a questo seleziono la grandezza della griglia

// let livello = prompt(`Scegli un livello di difficoltà tra "Facile", "Medio" o "Difficile"`);

let numeroCelle;

let btnAvvia = document.getElementById("avvia");
let celleLibere;
let punteggio;
let numbersClicked;

btnAvvia.addEventListener("click",
    function(){
        let livello = document.getElementById("livello").value;
        if (livello == "Facile") {
            numeroCelle = 100;
        } else if (livello == "Medio") {
            numeroCelle = 80;
        } else if (livello == "Difficile") {
            numeroCelle = 50;
        }
        
        griglia10(numeroCelle);
        celleLibere = numeroCelle - bombe.length;
        punteggio = 0;
        numbersClicked = [];
        
    }
);
bombe = [];


// while (!isNaN(livello)) {
//     alert("Errore!!!");
//     livello = prompt(`Scegli un livello di difficoltà tra "Facile", "Medio" o "Difficile"`);
// }

// if (livello == "Facile" || livello == "facile") {
//     numeroCelle = 100;
// } else if (livello == "Medio" || livello == "medio") {
//     numeroCelle = 80;
// } else if (livello == "Difficile" || livello == "difficile"){
//     numeroCelle = 50;
// }




let campo = document.getElementById("campo");

campo.addEventListener(`click`,
    function(evento) {

        let sceltaUtente = parseInt(evento.target.innerHTML);

        if (numbersClicked.includes(sceltaUtente)) {

            return alert("hai già cliccato");

        } else {

            if (bombe.includes(sceltaUtente) == true) {
                evento.target.classList.add("bomba-img");
                alert("BOMBA! BOOM! SEI ESPLOSO! Il tuo punteggio è:" + punteggio);
                location.reload();
            } 

            if (bombe.includes(sceltaUtente) == false && punteggio < celleLibere) {
                numbersClicked.push(sceltaUtente);
                punteggio ++;
                evento.target.classList.add("bg-lightgreen");
            } 
                
            if (punteggio == celleLibere) {
                evento.target.classList.add("bg-lightgreen");
                alert("HAI VINTO! NON HAI BECCATO NESSUNA BOMBA! Il tuo punteggio è: " + punteggio);
                location.reload();
            }   
        }        
    } 
);



