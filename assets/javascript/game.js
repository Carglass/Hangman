// initializing the global variables
let gameIsOn = false;
let word = "BONJOUR";
let count = 10;
var arrayToComplete = new Array(word.length);
    for (let index = 0; index < arrayToComplete.length; index++) {
        arrayToComplete[index] = 0;
    }
let answer = new String();

// hasGameEnded test if the game is over and terminates it if necessary
function hasGameEnded(globalCount) {
    if (globalCount >= 0 && answer === word) {
        console.log("You won!");
        displayScore('win');
        gameIsOn = false;
    } else if (globalCount === 0){
        console.log("You lost :(");
        displayScore('loose')
        gameIsOn = false;
    } else {
        gameIsOn = true;
    }
}

function displayScore(score){
    elem = document.getElementById("score");
    if (score === "win") {
        elem.innerHTML = "You won ! Press any key to restart";
    } else if (score === "loose") {
        elem.innerHTML = "You lost :( Press any key to restart";
    } else {
        elem.innerHTML = "An error ocurred :/";
    }
}

// treatLetter takes a letter as an input and finds if it is in the word, then complete the matching table accordingly
function treatLetter(input) {
    letter = input.toUpperCase();
    console.log(letter);
    var newRegular = RegExp(letter);
    console.log(newRegular);
    if (word.includes(letter)) {
        indexToStart = 0;
        stringToSearch = word;
        while ((indexToStart < word.length) && (stringToSearch.includes(letter))) {
            arrayToComplete[stringToSearch.search(newRegular) + indexToStart] = 1;
            indexToStart = stringToSearch.search(newRegular) + indexToStart + 1;
            stringToSearch = word.slice(indexToStart);
        }
        console.log(arrayToComplete);
        let wordToComplete = new String();
        for (let index = 0; index < arrayToComplete.length; index++) {
            if (arrayToComplete[index] === 1) {
                wordToComplete = wordToComplete.concat(word[index]);
            } else {
                wordToComplete = wordToComplete.concat("_");
            }
        }
        console.log(wordToComplete);
        answer = wordToComplete;
        displayAnswer();
    } else {
        console.log("missed");
    }
    count--;
    hasGameEnded(count);
    console.log(count);  
}

function displayAnswer() {
    elem = document.getElementById('word');
    elem.innerHTML = answer;
}

// Listener on key strike, launch game and initializes it if it was off, call treatLetter otherwise
document.addEventListener('keypress', (e) => {
    if (gameIsOn === true) {
        treatLetter(e.key);
    } else {
        gameIsOn = true;
        count = 10;
        for (let index = 0; index < arrayToComplete.length; index++) {
            arrayToComplete[index] = 0;
        }
        answer = "";
        alert("Game is on!");
    }
});





