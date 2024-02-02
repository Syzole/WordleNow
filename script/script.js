import WORDS from './words.js';

let height = 6; // also the number of guesses
let width = 5;
let row = 0;
let col = 0;
let continueGame = true;
let word = WORDS[Math.floor(Math.random() * WORDS.length)];

document.addEventListener('DOMContentLoaded', init);

function init() {
    console.log("For testing the word is " + word);

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

function update(){
    let correct = 0;

    for (let i = 0;i<width;i++){
        let currentTile = document.getElementById(row.toString() + "-" + i.toString());
        let letter = currentTile.innerText;
        letter = letter.toLowerCase();

        if(word[i]==letter){
            currentTile.classList.add(`correct`);
            correct++;
        }
        else if(word.includes(letter)){
            currentTile.classList.add(`present`);
        }
        else{
            currentTile.classList.add(`absent`);
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
