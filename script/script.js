import { WORDS } from './words.js';
let height = 6; //also the number of guesses
let width = 5;
let row = 0;
let col = 0;

let continueGame = true;
let word = WORDS[Math.floor(Math.random() * WORDS.length)];

function init(){
    console.log(WORDS);
}
