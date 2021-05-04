let config = {
    type: Phaser.CANVAS,
    width: 1280,
    height: 720,
    scene: [Title, Play],
    physics: {
        default: "arcade",
        arcade: {
            debug: true,
            gravity: { y: 1450 }
        }
    }
};

let game = new Phaser.Game(config);

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

let keySPACE;

let bgMusic;