let gameIsOn = false;
let word = "BONJOUR";
let count = 10;
var arrayToComplete = new Array(word.length);
    for (let index = 0; index < arrayToComplete.length; index++) {
        arrayToComplete[index] = 0;
    }
let answer = new String();

function hasGameEnded(globalCount) {
    if (globalCount >= 0 && answer === word) {
        console.log("You won!");
        gameIsOn = false;
    } else if (globalCount === 0){
        console.log("You lost :(");
        gameIsOn = false;
    } else {
        gameIsOn = true;
    }
}

function treatLetter(input) {
    letter = input.toUpperCase();
    console.log(letter);
    var newRegular = RegExp(letter);
    console.log(newRegular);
    if (word.includes(letter)) {
        // alert("found it!");
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
    } else {
        console.log("missed");
    }
    count--;
    hasGameEnded(count);
    console.log(count);  
}

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





