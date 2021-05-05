/*
James Doherty
Johnny Choi
Marc Anthony Cervantes
Nanxiang Wang
--------------------------------------------------------------------------------------------
Bread Runner
--------------------------------------------------------------------------------------------
playable at: https://drslowpokephd.github.io/EndlessRunner/
-----------------------
Date Submitted: 5/5/2021
--------------------------------------------------------------------------------------------
Our game started as a sort of generic side-scrolling endless runner with an action hero
and a helicopter chasing them with bullets and explosions, but it ended up being wackier
as we iterated through ideas. We landed on a bread-based game with a baker running from
a cabal of evil seagulls (now pigeons). We really liked this wacky, zany visual style, and
was it was a really natural switch from the previous style.
--------------------------------------------------------------------------------------------
Technology-wise the most interesting thing we did was probably implementing the parallax
scrolling in the background, using 3 different scrolling images. We also made active use of
GitHub and Discord with //TODO messages to each other, which was an interesting process.

We also have moving objects with collisions that the player can stand on (cars), and also
figured out random procedural generation using arrays. We also animated all of our sprites
(player, car, pigeon) using Piskel and made our own SFX and music with MusicLab Songmaker
(https://musiclab.chromeexperiments.com/Song-Maker/song/4594951638220800), and made UI 
mockups in Illustrator, using two fonts under a non-commercial license.

Fonts Used:
Bread Rough by Staircase Studio [CC BY-NC 2.0]
    (https://www.fontspace.com/bread-font-f46829)
bread and circus by Nishat Firoj [Non-Commercial Shareware]
    (https://www.fontspace.com/bread-and-circus-font-f19828)

*/

let config = {
    type: Phaser.CANVAS,
    width: 1280,
    height: 720,
    scene: [Title, Menu, Play],
    physics: {
        default: "arcade",
        arcade: {
            debug: true,
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

let keySPACE, keyLEFT, keyRIGHT;

let bgMusic;