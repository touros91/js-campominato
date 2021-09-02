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

// 1. creo la funzione che genera un numero random 

function numeroRandom (min, max) {
    return Math.floor( Math.random() * (max - min + 1) ) + min;
}

// 2. creo l'array bombe 

var bombe = [];

// 3. fino a quando la lunghezza dell'array è minore di 3, genero un numero casuale, se non è presente nell'array lo pusho dentro l'array 

while (bombe.length <= 2) {
    var numeroCasuale = numeroRandom(1, 20);
    if (bombe.includes(numeroCasuale) == false) {
        bombe.push(numeroCasuale);
    }
}

console.log(bombe);


// FUNZIONE 

// creo la funzione che disegna in pagina la griglia con massimo 10 celle per riga

function griglia10 (celle) {
    for (var i = 1; i <= celle; i++) {
        document.getElementById("campo").innerHTML += `<div class="cella">${i}</div>`;
    }
}

// PROGRAMMA PRINCIPALE 

// 1. chiedo all'utente di inserire un numero di celle compreso tra 1 e 100

// let numeroCelle = parseInt(prompt(`Inserisci un numero di celle compreso tra 1 e 100`));

// 2. validazione: verifico se il numero inserito dall'utente è compreso tra 1 e 100, in caso negativo gli chiedo di reinserirlo fino a quando non è compreso

while (isNaN(numeroCelle) || numeroCelle < 1 || numeroCelle > 100) {
    alert("Errore!");
    numeroCelle = parseInt(prompt(`Inserisci un numero di celle compreso tra 1 e 100`)); 
}

// 3. chiamo(invoco) la funzione griglia10

griglia10(numeroCelle);

// 4. creo un evento click su una cella che mostra il contenuto della stessa e cambia il colore di background in rosso 
   
document.getElementById("campo").addEventListener(`click`,
    function(evento) {
        alert(evento.target.innerHTML);
        evento.target.classList.toggle("bg-red");
    }
);


