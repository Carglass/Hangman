function game() {
    // document.removeEventListener('keypress', game);
    let word = "BONJOUR";
    let count = 10;
    var arrayToComplete = new Array(word.length);
    for (let index = 0; index < arrayToComplete.length; index++) {
        arrayToComplete[index] = 0;
    }
    let answer = new String();

    while (count > 0 && answer !== word) {
        // var letter = prompt("Enter a Letter");
        function treatLetter(letter) {
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
                alert("missed");
            }
            count--;
            console.log(count);  
        }
        
        // document.addEventListener('keypress',(e) => {
        //     treatLetter(e.key);
        // });
        
    }

    if (count >= 0 && answer === word) {
        console.log("You won!");
    } else {
        console.log("You lost :(");
    }

}

document.addEventListener('keypress', game);





