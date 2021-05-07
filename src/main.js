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
scrolling in the background, using 3 different scrolling images (Play.js "background scrolling").
This, along with the cars going by to the left, and the player character's walking animation,
makes it look like the player character is going really fast even though the player character's
X-position does not change.

Something else interesting was having our obstacles also be platforms that the player
can stand on (the cars). This was a unique challenge, because we had to put a collision behavior
at the side of the car for player damage and another one at the top of the car that just let
the player stand on top of it.

We also made the cars and pigeons randomly generate and tweaked the difficulty with testing
so that the player isn't put in too many unfair situations. Issues that we corrected included
bigrigs being taller than the jump height, bigrigs spawning with pigeons so the player had no out,
cars spawning too close together to the point where a jump would make you sail over a car but
collide with the next.

We also made active use of GitHub and Discord with //TODO messages to each other, which was
an interesting process. We used three scenes (Title, Menu, and Play) and transition between
the Menu and Play scenes after each game over, and gave the player a way to make some sort
of progress with purchasable power-ups.

We also made most of our own assets. We animated all of our sprites using Piskel, made our
own SFX with bfxr, and made our own background music with MusicLab Songmaker. There were also
UI mockups made in Adobe Illustrator then ported over. We used two fonts that we did not make,
under a non-commercial license.

Resources:
    Piskel (animations)
        https://www.piskelapp.com/
    bfxr (SFX)
        https://www.bfxr.net/
    MusicLab SongMaker (background music)
        https://musiclab.chromeexperiments.com/Song-Maker/song/4594951638220800


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

let bgMusic, jumpSound;