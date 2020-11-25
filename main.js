import { Animal } from '/animal.js';

const canvas = document.getElementById("canvasId");
/** @type {CanvasRenderingContext2D} */
const context = canvas.getContext('2d');

const myPet = new Animal("Rocky");
myPet.canEat();

// context.fillStyle = "red";
// context.fillRect(280, 20, 40, 20);

const george = new Image();
george.src = 'assets/george.png'
const GEORGE_WIDTH = 39;
const GEORGE_HEIGHT = 42;
let georgeX = 100;
let georgeY = 100;
george.onload = () => {
    context.drawImage(george, 0, 0*GEORGE_HEIGHT, GEORGE_WIDTH, GEORGE_HEIGHT,100, 100, GEORGE_WIDTH, GEORGE_HEIGHT);
}

const mario = new Image();
mario.src = 'assets/mario.png'
const MARIO_WIDTH = 24;
const MARIO_HEIGHT = 32;
let marioX = 0;
let marioY = 0;
mario.onload = () => {
    context.drawImage(mario, 0, 0*MARIO_HEIGHT, MARIO_WIDTH, MARIO_HEIGHT,0, 0, MARIO_WIDTH, MARIO_HEIGHT);
}

const button = document.getElementById("myButton");
button.addEventListener("click", function() {
    console.log(this);
    context.fillStyle = "green";
    context.fillRect(480, 20, 40, 20);
})

document.addEventListener("keydown", function(event) {
    context.clearRect(0, 0, 600, 400);
    switch(event.key) {
        case 'ArrowUp': {
            if (georgeY > 0){
                georgeY -= 10;
            }
            break;
        }
        case 'ArrowDown': {
            if (georgeY < 361){
                georgeY += 10;
            }
            break;
        }
        case 'ArrowLeft': {
            if (georgeX > 0){
                georgeX -= 10;
            }
            break;
        }
        case 'ArrowRight': {
            if (georgeX < 570){
                georgeX += 10;
            }
            break;
        }
        case 'w': {
            if (marioY > 0){
                marioY -= 10;
            }
            break;
        }
        case 's': {
            if (marioY < 361){
                marioY += 10;
            }
            break;
        }
        case 'a': {
            if (marioX > 0){
                marioX -= 10;
            }
            break;
        }
        case 'd': {
            if (marioX < 570){
                marioX += 10;
            }
            break;
        }
    }
        context.drawImage(mario, 0, 0*MARIO_HEIGHT, MARIO_WIDTH, MARIO_HEIGHT, marioX, marioY, MARIO_WIDTH, MARIO_HEIGHT);
        context.drawImage(george, 0, 0*GEORGE_HEIGHT, GEORGE_WIDTH, GEORGE_HEIGHT, georgeX, georgeY, GEORGE_WIDTH, GEORGE_HEIGHT);
})
