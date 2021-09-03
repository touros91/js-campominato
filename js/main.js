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

// creo la funzione che genera un numero random

function numeroRandom (min, max) {
    return Math.floor( Math.random() * (max - min + 1) ) + min;
}

// PROGRAMMA PRINCIPALE

// 1. creo l'array bombe (16)
let bombe = [];

let numeroCelle;
let btnAvvia = document.getElementById("avvia");
let celleLibere;
let punteggio;
let numbersClicked;
let numeroCasuale;

//BONUS: chiedo all'utente di inserire il livello di difficoltà ed in base a questo seleziono la grandezza della griglia

btnAvvia.addEventListener("click",
    function(){

        let livello = document.getElementById("livello").value;

        if (livello == "Facile") {
            numeroCelle = 100;
            // 3. fino a quando la lunghezza dell'array è minore di 16, genero un numero casuale, se non è presente nell'array lo pusho dentro l'array 
            while (bombe.length < 16) {
                numeroCasuale = numeroRandom(1, numeroCelle);
                if (bombe.includes(numeroCasuale) == false) {
                    bombe.push(numeroCasuale);
                }
            }
     
        } else if (livello == "Medio") {
            numeroCelle = 80;
            // 3. fino a quando la lunghezza dell'array è minore di 16, genero un numero casuale, se non è presente nell'array lo pusho dentro l'array 
            while (bombe.length < 16) {
                 numeroCasuale = numeroRandom(1, numeroCelle);
                if (bombe.includes(numeroCasuale) == false) {
                    bombe.push(numeroCasuale);
                }
            }

        } else if (livello == "Difficile") {
            numeroCelle = 50;
            // 3. fino a quando la lunghezza dell'array è minore di 16, genero un numero casuale, se non è presente nell'array lo pusho dentro l'array 
            while (bombe.length < 16) {
                 numeroCasuale = numeroRandom(1, numeroCelle);
                if (bombe.includes(numeroCasuale) == false) {
                    bombe.push(numeroCasuale);
                }
            }
        }
        
        griglia10(numeroCelle);
        celleLibere = numeroCelle - 16;
        punteggio = 0;
        numbersClicked = [];

        // una volta cliccato il bottone INIZIA, rendo visibile il bottone NUOVA PARTITA per ricominciare la partita qualora l'utente clicca su una casella non voluta
        document.getElementById("rigioca").classList.add("visibile");            
    }
);

let campo = document.getElementById("campo");

campo.addEventListener(`click`,
    function(evento) {

        let sceltaUtente = parseInt(evento.target.innerHTML);
        // 4. creo un evento click che esegue i controlli se una cella è già stata cliccata, altrimenti controlla se la cella cliccata è una bomba e se lo è dichiara il punteggio fino a quel punto, se non è una bomba incrementa il punteggio e colora la cella di verde e una volta che tutte le celle senza bomba sono cliccate dichiara il punteggio finale
        if (numbersClicked.includes(sceltaUtente)) {
            return alert("Hai già cliccato in questa casella");
        } else {

            if (bombe.includes(sceltaUtente) == true) {
                evento.target.classList.add("bomba-img");
                alert("BOOOOOOM! HAI PERSO! Il tuo punteggio è: " + punteggio);
                setTimeout(function() {
                    // fai qualcosa dopo 2 secondi
                    location.reload();//ricarica la pagina
                }, 2000);
            } 

            if (bombe.includes(sceltaUtente) == false && punteggio < celleLibere) {
                numbersClicked.push(sceltaUtente);
                punteggio ++;
                evento.target.classList.add("bg-lightgreen");
            } 
                
            if (punteggio == celleLibere) {
                evento.target.classList.add("bg-lightgreen");
                alert("HAI VINTO!!!!!! NON HAI BECCATO NESSUNA BOMBA! Il tuo punteggio è: " + punteggio);
                setTimeout(function() {
                    // fai qualcosa dopo 2 secondi
                    location.reload();//ricarica la pagina
                }, 2000);  
            }  

            document.getElementById("rigioca").addEventListener("click",
            function(evento){
                evento.target.classList.add("visibile");
                location.reload();
                griglia10(numeroCelle);
            }
            ); 
        }        
    } 
);

