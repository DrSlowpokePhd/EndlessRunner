class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
        this.debug = true;
        this.score = 0;
    }

    preload() {
        // load all image files here
        this.load.image('background', './Assets/ER-Background.png');
        this.load.image('player', './Assets/ER-Player.png');
        this.load.image('badguy', './Assets/ER-BadGuy.png');
        this.load.image('car', './Assets/ER-AmogusCar.png');
    }

    create() { 
        // background
        this.background = this.add.tileSprite(0, 0, 640, 480, 'background').setOrigin(0, 0);
        this.player = new Player(this, game.config.width/2, game.config.height/2, 'player');

        // configure input
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);          

        // array of cars
        this.cars = [];

        // collider between player and world boundaries
        this.physics.world.on('worldbounds', (body) => {
            console.log ("worldbounds" + body);
        });

        // debug text
        if (this.debug) {
            this.playerPosText = this.add.text(0, 0, ' ');
            this.playerIsJump = this.add.text(0, this.playerPosText.height, ' ');
            this.airText = this.add.text(0, this.playerPosText.height * 2, ' ');
            this.jRelease = this.add.text(0, this.playerPosText.height * 3, ' ');
        }

        let timer = this.time.addEvent({
            delay: 1000,
            callback: () => {
                let newcar = new Car(this, game.config.width, game.config.height - 70, 'car').setOrigin(0, 0);
                this.add.existing(newcar);
                this.cars.push(newcar);
            }, 
            loop: true
        });

        let scoretimer = this.time.addEvent({
            delay: 100,
            callback: () => {
                this.score += 1;
            },
        });
    }

    playerExplode(player) {
        console.log('player exploded'); 
    }

    update() {
        // check key input for restart 
        if (this.gameOver) {
            let endConfig = {
                fontFamily: 'Courier',
                fontSize: '28px',
                backgroundColor: '#F3B141',
                color: '#843605',
                align: 'right',
                padding: {
                    top: 5,
                    bottom: 5,
                }
                // fixedWidth: 100
            }
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', endConfig).setOrigin(0.5, 0);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press SPACE to return to menu', endConfig).setOrigin(0.5, 0);
        
            if (this.gameOver && Phaser.Input.Keyboard.JustDown(keySPACE)) {
                this.scene.start("menuScene");
            }
        } else {
            // check collisions
            // check for collision between player and highway
            
            if (this.player.y === 675) {
                this.player.inAir = false;
                if (this.player.isJumping) {
                    this.player.isJumping = false;
                }
                this.player.isFalling = false;
            } else {
                this.player.inAir = true;
            }
            // place all necessary update calls here
            if (!this.gameOver) {               
                this.player.update();
                // this.car.update();
                // this.player.clearAlpha();
                // this.car.clearAlpha();
            }
            let keyR = this.input.keyboard.addKey('R');
            if (this.debug && keyR.isDown) {
                this.scene.restart();
            }

            for (let car of this.cars) {
                car.update();
                // head on collision with car here
                if (car.x < -200) {
                    this.cars.shift();
                }
            }

            // update debug text
            this.playerPosText.text = 'position: ' + this.player.x + ', ' + this.player.y;
            this.playerIsJump.text = 'isJumping: ' + this.player.isJumping;
            this.airText.text = 'inAir: ' + this.player.inAir;
            this.jRelease.text = 'jumpRelease: ' + this.player.jumpRelease;
        }
    }
    
    checkCollision(rocket, ship) {
        // collision detection taken from Rocket Patrol Tutorial
        // simple AABB checking
        if (rocket.x < ship.x + ship.width && 
            rocket.x + rocket.width > ship.x && 
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship. y) {
            return true;
        } else {
            return false;
        }
    }

    onWorldBounds(body) {
        this.player.inAir = false;
    }
}
