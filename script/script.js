import WORDS from './words.js';

let height = 6; // also the number of guesses
let width = 5;
let row = 0;
let col = 0;
let continueGame = true;
let word = WORDS[Math.floor(Math.random() * WORDS.length)];
//recreate a qwerty keyboard
let letters = "QWERTYUIOPASDFGHJKLZXCVBNM";

document.addEventListener('DOMContentLoaded', init);

function init() {
    console.log("For testing the word is " + word);
    printKeyboard();
    //Make board
    for (let i = 0;i<height;i++) {
        for (let j = 0;j<width;j++) {
            let tile=document.createElement('span');
            tile.id = i.toString() + "-" + j.toString();
            tile.classList.add('tile');
            tile.innerHTML = "";
            document.getElementById('board').appendChild(tile);
        }
    }
    //Listen to keyboard
    document.addEventListener('keyup', (e)=>{
            if(!continueGame) {
                return;
            }
            
            //making sure person is pressing a letter(lower and upper included)
            if("KeyA"<=e.code && e.code<="KeyZ"){
                if(col<width){
                    let currentTile = document.getElementById(row.toString() + "-" + col.toString());
                    if(currentTile.innerHTML==""){
                        currentTile.innerHTML = e.code[3];
                        col++;
                    }
                }
            }

            else if(e.code=="Backspace"){
                if(col>0){
                    col--;
                    let currentTile = document.getElementById(row.toString() + "-" + col.toString());
                    currentTile.innerHTML = "";
                }
            }
            else if(e.code=="Enter"){

                if(col!=width){
                    alert("Please fill in all the letters");
                }
                else{
                    let isWordReal = checkIfWordIsInList();
                    if(!isWordReal){
                        alert("The word is not in the list");
                    }
                    else{
                        update();
                        row++;
                        col=0;
                    }

                }
            }

            if(continueGame&&row==height){
                continueGame = false;
                document.getElementById("correctAnswer").innerText = "The correct answer is: " + word.toUpperCase();
            }
        }
    ); 


}
//TODO: make the keyboard look better and add duplicate letter functionality
//also add a reset button
//also add a backspace button
function update(){
    let correct = 0;

    for (let i = 0;i<width;i++){
        let currentTile = document.getElementById(row.toString() + "-" + i.toString());
        let letter = currentTile.innerText;
        letter = letter.toLowerCase();

        if(word[i]==letter){
            letter = letter.toUpperCase();
            currentTile.classList.add(`correct`);
            //document.getElementById(letter).classList.remove(`key`);
            document.getElementById(letter).classList.add(`correct`);
            correct++;
        }
        else if(word.includes(letter)){
            letter = letter.toUpperCase();
            currentTile.classList.add(`present`);
            //document.getElementById(letter).classList.remove(`key`);
            document.getElementById(letter).classList.add(`present`);
        }
        else{
            letter = letter.toUpperCase();
            currentTile.classList.add(`absent`);
            //document.getElementById(letter).classList.remove(`key`);
            document.getElementById(letter).classList.add(`absent`);
        }

        if (correct==width){
            continueGame=false;
            document.getElementById("correctAnswer").innerText = "You win!";
        }
    }
}

function checkIfWordIsInList(){
    //First grab the word from the input
    let tempWord = "";

    for(let i =0;i<col;i++){
        let currentTile = document.getElementById(row.toString() + "-" + i.toString());
        tempWord+=currentTile.innerText;
    }

    console.log(tempWord);
    tempWord = tempWord.toLowerCase();

    //Check if the word is in the list
    if(WORDS.includes(tempWord)){
        return true;
    }
    else{
        return false;
    }
}

function printKeyboard() {
    let k1 = document.getElementById("keyR1");
    let k2 = document.getElementById("keyR2");
    let k3 = document.getElementById("keyR3");
    
    for (let i = 0; i < 26; i++) {
        let letter = document.createElement('button');
        letter.innerHTML = letters[i];
        letter.classList.add('key'); // Add the 'key' class to each button
        letter.addEventListener('click', function() {
            clickOnKey(letters[i]);
        });
        letter.id = letters[i];
        if (i < 10) {
            k1.appendChild(letter);
        } else if (i < 19) {
            k2.appendChild(letter);
        } else {
            k3.appendChild(letter);
        }
    }
}

function clickOnKey(key){
    //want to replicate the keyup event
    console.log("clicked on " + key);
    if(!continueGame) {
        return;
    }
    let e = new KeyboardEvent('keyup', {'code': 'Key' + key});
    document.dispatchEvent(e);
}
    