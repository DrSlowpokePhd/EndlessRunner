/*
James Doherty
Johnny Choi
Marc Anthony Cervantes
Nanxiang Wang
-----------------------
Bread Runner
-----------------------
*/

let config = {
    type: Phaser.CANVAS,
    width: 1280,
    height: 720,
    scene: [Title, Menu, Play],
    physics: {
        default: "arcade",
        arcade: {
            debug: false,
            gravity: { y: 1450 },
            checkCollision: {
                left: false,
                right: false
            }
        }
    }
};

let game = new Phaser.Game(config);

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

let keySPACE, keyLEFT, keyRIGHT, keyR;

let highScore;

let bgMusic;