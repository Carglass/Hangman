// Declaring & initializing the global variables
let gameIsOn = false;
let words = ["ONE PIECE","BLEACH","NARUTO","DRAGON BALL","DEATH NOTE","BAKUMAN","HUNTER X HUNTER","ATTACK ON TITANS"];
let word = words[getRandomInt(words.length)];
let count = 20;
let arrayToComplete = new Array(word.length);
let answer = new String();
let guessed = new String();

// Events
// Listener on key strike, launch game and initializes it if it was off, call treatLetter otherwise
document.addEventListener('keypress', (e) => {
    if (gameIsOn === true) {
        elemBody.classList.add("bgc-wh-delay");
        treatLetter(e.key);
    } else {
        reset();
        elemBody = document.getElementById("body");
        elemBody.classList.remove("bgc-wh-delay");
        elemBody.classList.add("bgc-green");
        gameIsOn = true;
    }
});

//Utilities
//function to get a random int 
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

//Controllers
// hasGameEnded test if the game is over and terminates it if necessary
function hasGameEnded(globalCount) {
    if (globalCount >= 0 && answer === word) {
        displayScore('win');
        gameIsOn = false;
    } else if (globalCount === 0){
        displayScore('loose');
        gameIsOn = false;
    } else {
        gameIsOn = true;
    }
}

// treatLetter takes a letter as an input and finds if it is in the word, then complete the matching table accordingly
function treatLetter(input) {
    letter = input.toUpperCase();
    var newRegular = RegExp(letter);
    if (word.includes(letter)) {
        // we complete our array with the letter found
        indexToStart = 0;
        stringToSearch = word;
        // the loop helps at making sure we take into account all the occurences of the letter
        while ((indexToStart < word.length) && (stringToSearch.includes(letter))) {
            arrayToComplete[stringToSearch.search(newRegular) + indexToStart] = 1;
            indexToStart = stringToSearch.search(newRegular) + indexToStart + 1;
            stringToSearch = word.slice(indexToStart);
        }
        // we update answer to display the current status
        let wordToComplete = new String();
        for (let index = 0; index < arrayToComplete.length; index++) {
            if (arrayToComplete[index] === 1) {
                wordToComplete = wordToComplete.concat(word[index]);
            } else {
                wordToComplete = wordToComplete.concat("_");
            }
        }
        answer = wordToComplete;
        // two display functions to keep the user posted
        displayAnswer();
        displayRemaining();
    } else {
        guessed = guessed.concat(letter);
        displayGuessed();
        displayRemaining();
    }
    count--;
    hasGameEnded(count); 
}

//reset game to initial state
function reset(){
    resetLogic();
    resetDisplay();
}

//reset all global variables to default values.
function resetLogic(){
    word = words[getRandomInt(words.length)];
    count = 20;
    arrayToComplete = new Array(word.length);
    for (let index = 0; index < arrayToComplete.length; index++) {
        if (word[index] !== " ") {
            arrayToComplete[index] = 0;
        } else {
            arrayToComplete[index] = 1;
        }
    }
    answer = "";
    for (let index = 0; index < word.length; index++) {
        if (arrayToComplete[index] === 0) {
            answer = answer.concat("_");;
        } else {
            answer = answer.concat(" ");;
        }
        
    }
    guessed = "";
}

function resetDisplay(nbLetters){
    // reset #word
    let elemWord = document.getElementById('word');
    elemWord.innerHTML = answer;
    // reset #count
    let elemCount = document.getElementById('count');
    elemCount.innerHTML = count;
    elemCount.classList.remove("c-rd");
    elemCount.classList.remove('fw-b');
    // reset score
    let elemScore = document.getElementById('score');
    elemScore.innerHTML = "";
    elemScore.classList.remove("alert");
    elemScore.classList.remove("alert-success");
    elemScore.classList.remove("alert-danger");
    // reset guessed
    let elemGuessed = document.getElementById('guessedLetters');
    elemGuessed.innerHTML = "";
}

// User Interface
// function to display the final score (Loose/Win)
function displayScore(score){
    elem = document.getElementById("score");
    if (score === "win") {
        elem.innerHTML = "You won ! Press any key to restart";
        classes = elem.classList;
        classes.add("alert","alert-success");
    } else if (score === "loose") {
        elem.innerHTML = "You lost :( Press any key to restart";
        classes = elem.classList;
        classes.add("alert","alert-danger");
    } else {
        elem.innerHTML = "An error ocurred :/";
    }
}

//function to display remaining attempts
function displayRemaining(){
    elem = document.getElementById("count");
    elem.innerHTML = count;
    if (count <= 3) {
        countClasses = elem.classList;
        countClasses.add("c-rd");
        countClasses.add("fw-b");
    }
}

// function to display the letters guessed (that were not included in the word)
function displayGuessed(){
    elem = document.getElementById("guessedLetters");
    elem.innerHTML = guessed;
}

// function to display the current answer from the user
function displayAnswer() {
    elem = document.getElementById('word');
    elem.innerHTML = answer;
}







