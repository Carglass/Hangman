let word = "BONJOUR";
let count = 10;
var arrayToComplete = new Array(word.length);
for (let index = 0; index < arrayToComplete.length; index++) {
    arrayToComplete[index] = 0;
}

while (count > 0) {
    var newLetter = prompt("Enter a Letter");
    var newRegular = RegExp(newLetter);
    console.log(newRegular);
    if (word.includes(newLetter)) {
        alert("found it!");
        arrayToComplete[word.search(newRegular)] = 1
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
    } else {
        alert("missed");
    }
    count--;
    console.log(count);
}





