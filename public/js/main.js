// import { Animal } from '/js/animal.js';

const canvas = document.getElementById("game-canvas");
/** @type {CanvasRenderingContext2D} */
const context = canvas.getContext('2d');

// const myPet = new Animal("Rocky");
// myPet.canEat();

// // context.fillStyle = "red";
// // context.fillRect(280, 20, 40, 20);

// const george = new Image();
// george.src = 'assets/george.png'
// const GEORGE_WIDTH = 39;
// const GEORGE_HEIGHT = 42;
// let georgeX = 100;
// let georgeY = 100;
// george.onload = () => {
//     context.drawImage(george, 0, 0*GEORGE_HEIGHT, GEORGE_WIDTH, GEORGE_HEIGHT,100, 100, GEORGE_WIDTH, GEORGE_HEIGHT);
// }

// const mario = new Image();
// mario.src = 'assets/mario.png'
// const MARIO_WIDTH = 24;
// const MARIO_HEIGHT = 32;
// let marioX = 0;
// let marioY = 0;
// mario.onload = () => {
//     context.drawImage(mario, 0, 0*MARIO_HEIGHT, MARIO_WIDTH, MARIO_HEIGHT,0, 0, MARIO_WIDTH, MARIO_HEIGHT);
// }

// const button = document.getElementById("myButton");
// button.addEventListener("click", function() {
//     console.log(this);
//     context.fillStyle = "green";
//     context.fillRect(480, 20, 40, 20);
// })

// document.addEventListener("keydown", function(event) {
//     context.clearRect(0, 0, 600, 400);
//     switch(event.key) {
//         case 'ArrowUp': {
//             if (georgeY > 0){
//                 georgeY -= 10;
//             }
//             break;
//         }
//         case 'ArrowDown': {
//             if (georgeY < 361){
//                 georgeY += 10;
//             }
//             break;
//         }
//         case 'ArrowLeft': {
//             if (georgeX > 0){
//                 georgeX -= 10;
//             }
//             break;
//         }
//         case 'ArrowRight': {
//             if (georgeX < 570){
//                 georgeX += 10;
//             }
//             break;
//         }
//         case 'w': {
//             if (marioY > 0){
//                 marioY -= 10;
//             }
//             break;
//         }
//         case 's': {
//             if (marioY < 361){
//                 marioY += 10;
//             }
//             break;
//         }
//         case 'a': {
//             if (marioX > 0){
//                 marioX -= 10;
//             }
//             break;
//         }
//         case 'd': {
//             if (marioX < 570){
//                 marioX += 10;
//             }
//             break;
//         }
//     }
//         context.drawImage(mario, 0, 0*MARIO_HEIGHT, MARIO_WIDTH, MARIO_HEIGHT, marioX, marioY, MARIO_WIDTH, MARIO_HEIGHT);
//         context.drawImage(george, 0, 0*GEORGE_HEIGHT, GEORGE_WIDTH, GEORGE_HEIGHT, georgeX, georgeY, GEORGE_WIDTH, GEORGE_HEIGHT);
// })

const socket = io();

document.getElementById('join-chat-button').addEventListener('click', function() {
    const input = document.getElementById('user-name-input');
    const userName = input.value;
    if (userName.length > 0){
        document.getElementById('user-name-missing').classList.add('display-none');
        socket.emit('join-chat', userName);
    } else {
        document.getElementById('user-name-missing').classList.remove('display-none');
    }
})

socket.on('joined-chat', function() {
    console.log("You joined chat!");
    document.getElementById('menu').classList.add('display-none');
    document.getElementById('chat-container').classList.remove('display-none');
});

document.getElementById('send-message-button').addEventListener('click', function() {
    const input = document.getElementById('message');
    const message = input.value;
    socket.emit('send-message', message);
})

socket.on('new-message', function(message) {
    const messagesContainer = document.getElementById('chat-messages');
    const messageElement = document.createElement('p');
    messageElement.innerHTML = message;
    messagesContainer.appendChild(messageElement);
})

document.getElementById('leave-chat-button').addEventListener('click', function() {
    socket.emit('leave-chat');
})

socket.on('menu', function() {
    console.log("You left the chat");
    document.getElementById('menu').classList.remove('display-none');
    document.getElementById('chat-container').classList.add('display-none');
    document.getElementById('game-container').classList.add('display-none');
})

document.getElementById('create-game-button').addEventListener('click', function() {
    const input = document.getElementById('game-name-input');
    const gameName = input.value;
    if (gameName.length > 0){
        document.getElementById('game-name-missing').classList.add('display-none');
        socket.emit('create-game', gameName);
    } else {
        document.getElementById('game-name-missing').classList.remove('display-none');
    }
})

socket.on('game-loop', function(data) {
    document.getElementById('menu').classList.add('display-none');
    document.getElementById('back-to-menu').classList.add('display-none');
    document.getElementById('game-container').classList.remove('display-none');
    context.drawImage(document.getElementById('map-image'), 0, 0);

    data.objectsForDraw.forEach(function (objectForDraw) {
        context.drawImage(
            document.getElementById(objectForDraw.imageId),
            ...objectForDraw.drawImageParameters
        )
    })

    if (data.gameInProgress) {
        document.getElementById('waiting-for-players').classList.add('display-none');
        document.getElementById('score-container').classList.remove('display-none');
        document.getElementById('space-ranger-score').innerHTML = data.score['space-ranger'];
        document.getElementById('pink-lady-score').innerHTML = data.score['pink-lady'];
    } else {
        document.getElementById('waiting-for-players').classList.remove('display-none');
        document.getElementById('score-container').classList.add('display-none');
    }
})

    document.addEventListener("keydown", function(event) {
        switch(event.key) {
            case 'ArrowUp': {
                socket.emit('start-moving-player', 'up');
                break;
            }
            case 'ArrowDown': {
                socket.emit('start-moving-player', 'up');
                break;
            }
            case 'ArrowLeft': {
                socket.emit('start-moving-player', 'up');
                break;
            }
            case 'ArrowRight': {
                socket.emit('start-moving-player', 'up');
            }
            case ' ': {
                socket.emit('attack');
                break;
            }
        }
    })

    document.addEventListener("keyup", function(event) {
        switch(event.key) {
            case 'ArrowUp':
            case 'ArrowDown': {
                socket.emit('stop-moving-player', 'dy');
                break;
            }
            case 'ArrowLeft':
            case 'ArrowRight': {
                socket.emit('stop-moving-player', 'dx');
                break;
            }
        }
})

socket.on('add-game-to-list', function(options) {
    const gameElementContainer = document.createElement('div');
    gameElementContainer.classList.add('game-element');
    gameElementContainer.id = options.gameId;

    const gameNameElement = document.createElement('p');
    gameNameElement.innerHTML = options.gameName;

    const joinGameButton = document.createElement('button');
    joinGameButton.innerHTML = 'Join Game';

    joinGameButton.addEventListener('click', function() {
        socket.emit('join-game', options.gameId);
    })

    gameElementContainer.appendChild(gameNameElement);
    gameElementContainer.appendChild(joinGameButton);

    document.getElementById('game-list').appendChild(gameElementContainer);

})

socket.on('remove-game-from-list', function(gameId) {
    document.getElementById(gameId).classList.add('display-none');
})

socket.on('game-over', function(imageId, gameId) {
    context.drawImage(document.getElementById(imageId), 0, 0);
    document.getElementById('back-to-menu').classList.remove('display-none');
    document.getElementById('back-to-menu').dataset.gameId = gameId;
    document.getElementById('score-container').classList.add('display-none');
})

document.getElementById('back-to-menu').addEventListener('click', function() {
    socket.emit('back-to-menu', document.getElementById('back-to-menu').dataset.gameId);
})