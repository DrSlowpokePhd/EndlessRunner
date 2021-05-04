class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
        this.debug = true;
        this.score = 0;
    }

    preload() {
        // load all image files here
        this.load.image('background_back', './Assets/backgrounds/endlessRunnerBackgroundBack.png');
        this.load.image('background_middle', './Assets/backgrounds/endlessRunnerBackgroundMiddle.png');
        this.load.image('background_front', './Assets/backgrounds/endlessRunnerBackgroundFront.png');
        this.load.image('player', './Assets/ER-Player.png');
        this.load.image('badguy', './Assets/ER-BadGuy.png');
        this.load.image('car', './Assets/ER-AmogusCar.png');

        // load all spritesheet files here for vehicles
        this.load.spritesheet('vehicle1_blue', 'assets/vehicle_assets/vehicle1_blue.png', {frameWidth: 250, frameHeight: 140, startFrame: 0, endFrame: 2});
        this.load.spritesheet('vehicle1_green', 'assets/vehicle_assets/vehicle1_green.png', {frameWidth: 250, frameHeight: 140, startFrame: 0, endFrame: 2});
        this.load.spritesheet('vehicle1_red', 'assets/vehicle_assets/vehicle1_red.png', {frameWidth: 250, frameHeight: 140, startFrame: 0, endFrame: 2});

        this.load.spritesheet('vehicle2_blue', 'assets/vehicle_assets/vehicle2_blue.png', {frameWidth: 260, frameHeight: 140, startFrame: 0, endFrame: 2});
        this.load.spritesheet('vehicle2_purple', 'assets/vehicle_assets/vehicle2_purple.png', {frameWidth: 260, frameHeight: 140, startFrame: 0, endFrame: 2});
        this.load.spritesheet('vehicle2_white', 'assets/vehicle_assets/vehicle2_white.png', {frameWidth: 260, frameHeight: 140, startFrame: 0, endFrame: 2});

        this.load.spritesheet('rig_green', 'assets/vehicle_assets/bigrig_green.png', {frameWidth: 650, frameHeight: 300, startFrame: 0, endFrame: 2});
        this.load.spritesheet('rig_red', 'assets/vehicle_assets/bigrig_red.png', {frameWidth: 650, frameHeight: 300, startFrame: 0, endFrame: 2});
        this.load.spritesheet('rig_yellow', 'assets/vehicle_assets/bigrig_yellow.png', {frameWidth: 650, frameHeight: 300, startFrame: 0, endFrame: 2});

        // spritesheets for the characters
        this.load.spritesheet('baker_run', 'assets/character_sprites/baker_sprite.png', {frameWidth: 110, frameHeight: 150, startFrame: 0, endFrame: 9});
        this.load.spritesheet('pigeon_fly', 'assets/character_sprites/pigeon_sprite.png', {frameWidth: 100, frameHeight: 100, startFrame: 0, endFrame: 1});
            
        // load audio
        this.load.audio('jump_sfx', './Assets/sounds/endlessRunner_Jump.wav');
        this.load.audio('hit_sfx', './Assets/sounds/endlessRunner_Hit.wav');
        this.load.audio('background_music', './Assets/sounds/endlessRunner_Music.wav');
    }

    create() { 

        //add music
        if(bgMusic == undefined) //prevent duplication
        {
            bgMusic = this.sound.add('background_music');
        }

        // background
        this.background1 = this.add.tileSprite(0, 0, 1280, 720, 'background_back').setOrigin(0, 0);
        this.background2 = this.add.tileSprite(0, 0, 1280, 720, 'background_middle').setOrigin(0, 0);
        this.background3 = this.add.tileSprite(0, 0, 1280, 720, 'background_front').setOrigin(0, 0);

        this.player = new Player(this, game.config.width/2, game.config.height/2, 'player');

        // configure input
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);          

        //animation configuration
        this.anims.create({
            key: 'driving1',
            frames: this.anims.generateFrameNumbers('vehicle1_blue', {start: 0, end: 2, first: 0}),
            frameRate: 30,
            repeat: -1,
        });

        this.anims.create({
            key: 'driving2',
            frames: this.anims.generateFrameNumbers('vehicle1_green', {start: 0, end: 2, first: 0}),
            frameRate: 30,
            repeat: -1,
        });

        this.anims.create({
            key: 'driving3',
            frames: this.anims.generateFrameNumbers('vehicle1_red', {start: 0, end: 2, first: 0}),
            frameRate: 30,
            repeat: -1,
        });

        this.anims.create({
            key: 'driving4',
            frames: this.anims.generateFrameNumbers('vehicle2_blue', {start: 0, end: 2, first: 0}),
            frameRate: 30,
            repeat: -1,
        });

        this.anims.create({
            key: 'driving5',
            frames: this.anims.generateFrameNumbers('vehicle2_purple', {start: 0, end: 2, first: 0}),
            frameRate: 30,
            repeat: -1,
        });

        this.anims.create({
            key: 'driving6',
            frames: this.anims.generateFrameNumbers('vehicle2_white', {start: 0, end: 2, first: 0}),
            frameRate: 30,
            repeat: -1,
        });

        this.anims.create({
            key: 'driving7',
            frames: this.anims.generateFrameNumbers('rig_green', {start: 0, end: 2, first: 0}),
            frameRate: 30,
            repeat: -1,
        });

        this.anims.create({
            key: 'driving8',
            frames: this.anims.generateFrameNumbers('rig_red', {start: 0, end: 2, first: 0}),
            frameRate: 30,
            repeat: -1,
        });

        this.anims.create({
            key: 'driving9',
            frames: this.anims.generateFrameNumbers('rig_yellow', {start: 0, end: 2, first: 0}),
            frameRate: 30,
            repeat: -1,
        });
        
        // array of animations
        this.vehicle1Array = new Array('vehicle1_blue','vehicle1_green','vehicle1_red');
        this.vehicle1AnimArray = new Array('driving1','driving2','driving3');

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
                this.randomInt = Math.floor(Math.random() * this.vehicle1Array.length);

                let newcar = new Car(this, game.config.width, game.config.height - 140, this.vehicle1Array[this.randomInt]).setOrigin(0, 0);
                this.add.existing(newcar);
                
                //Play animations
                newcar.anims.play(this.vehicle1AnimArray[this.randomInt]); //animations don't play yet

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
         //check if music is playing
         if(!bgMusic.isPlaying)
         {
             bgMusic.play();
         }

        //background scrolling
        this.background1.tilePositionX += 2;
        this.background2.tilePositionX += 4;
        this.background3.tilePositionX += 6;

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
