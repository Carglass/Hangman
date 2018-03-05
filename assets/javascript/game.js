// Declaring & initializing the global variables
let words = [{name: "ONE PIECE", clue:"Pirates"}, {name: "BLEACH", clue: "Bankai"}, {name: "NARUTO", clue: "Ninja"}, {name: "DRAGON BALL", clue:"Kaaaa-Meeee"}, {name: "DEATH NOTE", clue:"dangerous notebook"}, {name: "BAKUMAN", clue:"how to create manga"}, {name:"HUNTER X HUNTER", clue:"a quest to find Gon's dad"}, {name: "ATTACK ON TITANS", clue:"big big big"}];
// let word = words[getRandomInt(words.length)];

let game = {
    state: false,
    wordToGuessObject: words[getRandomInt(words.length)],
    remainingCount: 20,
    arrayToComplete: [],
    currentAnswer: "",
    currentGuessed: "",
    hasEnded: function (globalCount) {
        if (globalCount >= 0 && this.currentAnswer === this.wordToGuessObject.name) {
            this.displayScore('win');
            this.state = false;
        } else if (globalCount === 0) {
            this.displayScore('loose');
            this.state = false;
        } else {
            this.state = true;
        }
    },
    treatLetter: function (input) {
        letter = input.toUpperCase();
        var newRegular = RegExp(letter);
        if (this.wordToGuessObject.name.includes(letter)) {
            // we complete our array with the letter found
            indexToStart = 0;
            stringToSearch = this.wordToGuessObject.name;
            // the loop helps at making sure we take into account all the occurences of the letter
            while ((indexToStart < this.wordToGuessObject.name.length) && (stringToSearch.includes(letter))) {
                this.arrayToComplete[stringToSearch.search(newRegular) + indexToStart] = 1;
                indexToStart = stringToSearch.search(newRegular) + indexToStart + 1;
                stringToSearch = this.wordToGuessObject.name.slice(indexToStart);
            }
            // we update answer to display the current status
            let wordToComplete = new String();
            for (let index = 0; index < this.arrayToComplete.length; index++) {
                if (this.arrayToComplete[index] === 1) {
                    wordToComplete = wordToComplete.concat(this.wordToGuessObject.name[index]);
                } else {
                    wordToComplete = wordToComplete.concat("_");
                }
            }
            this.currentAnswer = wordToComplete;
            // two display functions to keep the user posted
            this.displayAnswer();
            // displayRemaining();
        } else {
            this.currentGuessed = this.currentGuessed.concat(letter);
            this.displayGuessed();
            // displayRemaining();
        }
        this.remainingCount--;
        this.displayRemaining();
        if (this.remainingCount <= 10) {
            this.displayClue();
        }
        this.hasEnded(this.remainingCount);
    },
    reset: function () {
        this.resetLogic();
        this.resetDisplay();
    },
    resetLogic: function () {
        this.wordToGuessObject = words[getRandomInt(words.length)];
        this.remainingCount = 20;
        this.arrayToComplete = new Array(this.wordToGuessObject.name.length);
        for (let index = 0; index < this.arrayToComplete.length; index++) {
            if (this.wordToGuessObject.name[index] !== " ") {
                this.arrayToComplete[index] = 0;
            } else {
                this.arrayToComplete[index] = 1;
            }
        }
        this.currentAnswer = "";
        for (let index = 0; index < this.wordToGuessObject.name.length; index++) {
            if (this.arrayToComplete[index] === 0) {
                this.currentAnswer = this.currentAnswer.concat("_");;
            } else {
                this.currentAnswer = this.currentAnswer.concat(" ");;
            }

        }
        this.currentGuessed = "";
    },
    resetDisplay: function (nbLetters) {
        // reset #word
        let elemWord = document.getElementById('word');
        elemWord.innerHTML = this.currentAnswer;
        // reset #count
        let elemCount = document.getElementById('count');
        elemCount.innerHTML = this.remainingCount;
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
        // reset clue
        let elemClue = document.getElementById('clue');
        elemClue.innerHTML = "";
    },
    displayScore: function (score) {
        elem = document.getElementById("score");
        if (score === "win") {
            elem.innerHTML = "You won ! Press any key to restart";
            classes = elem.classList;
            classes.add("alert", "alert-success");
        } else if (score === "loose") {
            elem.innerHTML = "You lost :( Press any key to restart";
            classes = elem.classList;
            classes.add("alert", "alert-danger");
        } else {
            elem.innerHTML = "An error ocurred :/";
        }
    },
    displayRemaining: function () {
        elem = document.getElementById("count");
        elem.innerHTML = this.remainingCount;
        if (this.remainingCount <= 3) {
            countClasses = elem.classList;
            countClasses.add("c-rd");
            countClasses.add("fw-b");
        }
    },
    displayGuessed: function () {
        elem = document.getElementById("guessedLetters");
        elem.innerHTML = this.currentGuessed;
    },
    displayAnswer: function () {
        elem = document.getElementById('word');
        elem.innerHTML = this.currentAnswer;
    },
    displayClue: function (){
        elem = document.getElementById('clue');
        elem.innerHTML = this.wordToGuessObject.clue;
    }
};

// Events
// Listener on key strike, launch game and initializes it if it was off, call treatLetter otherwise
document.addEventListener('keypress', (e) => {
    if (game.state === true) {
        elemBody.classList.add("bgc-wh-delay");
        game.treatLetter(e.key);
    } else {
        game.reset();
        elemBody = document.getElementById("body");
        elemBody.classList.remove("bgc-wh-delay");
        elemBody.classList.add("bgc-green");
        game.state = true;
    }
});

//Utilities
//function to get a random int 
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
