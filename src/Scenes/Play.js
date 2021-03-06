class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
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
        this.load.spritesheet('vehicle1_blue', './Assets/vehicle_assets/vehicle1_blue.png', {frameWidth: 250, frameHeight: 140, startFrame: 0, endFrame: 2});
        this.load.spritesheet('vehicle1_green', './Assets/vehicle_assets/vehicle1_green.png', {frameWidth: 250, frameHeight: 140, startFrame: 0, endFrame: 2});
        this.load.spritesheet('vehicle1_red', './Assets/vehicle_assets/vehicle1_red.png', {frameWidth: 250, frameHeight: 140, startFrame: 0, endFrame: 2});

        this.load.spritesheet('vehicle2_blue', './Assets/vehicle_assets/vehicle2_blue.png', {frameWidth: 260, frameHeight: 140, startFrame: 0, endFrame: 2});
        this.load.spritesheet('vehicle2_purple', './Assets/vehicle_assets/vehicle2_purple.png', {frameWidth: 260, frameHeight: 140, startFrame: 0, endFrame: 2});
        this.load.spritesheet('vehicle2_white', './Assets/vehicle_assets/vehicle2_white.png', {frameWidth: 260, frameHeight: 140, startFrame: 0, endFrame: 2});

        this.load.spritesheet('rig_green', './Assets/vehicle_assets/bigrig_green.png', {frameWidth: 650, frameHeight: 300, startFrame: 0, endFrame: 2});
        this.load.spritesheet('rig_red', './Assets/vehicle_assets/bigrig_red.png', {frameWidth: 650, frameHeight: 300, startFrame: 0, endFrame: 2});
        this.load.spritesheet('rig_yellow', './Assets/vehicle_assets/bigrig_yellow.png', {frameWidth: 650, frameHeight: 300, startFrame: 0, endFrame: 2});

        // spritesheets for the characters
        this.load.spritesheet('baker_run', './Assets/character_sprites/baker_sprite.png', {frameWidth: 80, frameHeight: 150, startFrame: 0, endFrame: 9});
        this.load.spritesheet('pigeon_fly', './Assets/character_sprites/pigeon_sprite.png', {frameWidth: 75, frameHeight: 55, startFrame: 0, endFrame: 1});
            
        // load audio
        this.load.audio('jump_sfx', './Assets/sounds/endlessRunner_Jump.wav');
        this.load.audio('hit_sfx', './Assets/sounds/endlessRunner_Hit.wav');
        this.load.audio('background_music', './Assets/sounds/endlessRunner_Music.wav');
    }

    create() { 
        this.score = 0;
        
        //add music
        if(bgMusic == undefined) //prevent duplication
        {
            bgMusic = this.sound.add('background_music');
        }

        //add jumpSound
        if(jumpSound == undefined) //prevent duplication
        {
            jumpSound = this.sound.add('jump_sfx');
        }

        // background
        this.background1 = this.add.tileSprite(0, 0, 1280, 720, 'background_back').setOrigin(0, 0);
        this.background2 = this.add.tileSprite(0, 0, 1280, 720, 'background_middle').setOrigin(0, 0);
        this.background3 = this.add.tileSprite(0, 0, 1280, 720, 'background_front').setOrigin(0, 0);

        // configure input
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);      
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);        

        //animation configuration

        //player animations
        this.anims.create({
            key: 'playerRun',
            frames: this.anims.generateFrameNumbers('baker_run', {start: 0, end: 9, first:0}),
            frameRate: 20,
            repeat: -1
        });

        //vehicle animations
        this.anims.create({
            key: 'driving1',
            frames: this.anims.generateFrameNumbers('vehicle1_blue', {start: 0, end: 2, first: 0}),
            frameRate: 12,
            repeat: -1,
        });

        this.anims.create({
            key: 'driving2',
            frames: this.anims.generateFrameNumbers('vehicle1_green', {start: 0, end: 2, first: 0}),
            frameRate: 12,
            repeat: -1,
        });

        this.anims.create({
            key: 'driving3',
            frames: this.anims.generateFrameNumbers('vehicle1_red', {start: 0, end: 2, first: 0}),
            frameRate: 12,
            repeat: -1,
        });

        this.anims.create({
            key: 'driving4',
            frames: this.anims.generateFrameNumbers('vehicle2_blue', {start: 0, end: 2, first: 0}),
            frameRate: 12,
            repeat: -1,
        });

        this.anims.create({
            key: 'driving5',
            frames: this.anims.generateFrameNumbers('vehicle2_purple', {start: 0, end: 2, first: 0}),
            frameRate: 12,
            repeat: -1,
        });

        this.anims.create({
            key: 'driving6',
            frames: this.anims.generateFrameNumbers('vehicle2_white', {start: 0, end: 2, first: 0}),
            frameRate: 12,
            repeat: -1,
        });

        this.anims.create({
            key: 'driving7',
            frames: this.anims.generateFrameNumbers('rig_green', {start: 0, end: 2, first: 0}),
            frameRate: 12,
            repeat: -1,
        });

        this.anims.create({
            key: 'driving8',
            frames: this.anims.generateFrameNumbers('rig_red', {start: 0, end: 2, first: 0}),
            frameRate: 12,
            repeat: -1,
        });

        this.anims.create({
            key: 'driving9',
            frames: this.anims.generateFrameNumbers('rig_yellow', {start: 0, end: 2, first: 0}),
            frameRate: 12,
            repeat: -1,
        });

        this.anims.create({
            key: 'flying',
            frames: this.anims.generateFrameNumbers('pigeon_fly', {start: 0, end: 1, first: 0}), 
            framerate: 5, 
            repeat: -1,
        });

        // array of vehicle heights
        this.vehicleHeightArray = new Array(140, 140);

        // array of vehicle heights
        this.vehicleWidthArray = new Array(250, 260);

        // create pigeons
        this.pigeon1 = null;
        this.pigeon2 = null;

        let pigeonDelay = this.time.addEvent({
            delay: 15000,
            callback: () => {
                this.pigeonHeight1 = Math.random() * (250) + 50;
                this.pigeonHeight2 = Math.random() * (250) + 50;

                this.pigeon1 = new Pigeon (this, game.config.width*2 + 75, this.pigeonHeight1, 'pigeon_fly');
                this.pigeon2 = new Pigeon (this, game.config.width*2 + 750, this.pigeonHeight2, 'pigeon_fly');

                //play pigeon animation
                this.pigeon1.anims.play('flying');
                this.pigeon2.anims.play('flying');
            }
        });

        // create player
        this.player = new Player(this, game.config.width/2 - 100, game.config.height/2, 'baker_run').setOrigin(0,0);
        this.player.play('playerRun');

        // arrays of textures and animations
        this.vehicle1Array = new Array('vehicle1_blue','vehicle1_green','vehicle1_red');
        this.vehicle1AnimArray = new Array('driving1','driving2','driving3');

        this.vehicle2Array = new Array('vehicle2_blue','vehicle2_purple','vehicle2_white');
        this.vehicle2AnimArray = new Array('driving4','driving5','driving6');

        this.vehicle3Array = new Array('rig_green','rig_red','rig_yellow');
        this.vehicle3AnimArray = new Array('driving7','driving8','driving9');

        // array of which vehicle
        this.vehicleType = new Array(this.vehicle1Array, this.vehicle2Array);
        this.vehicleTypeAnim = new Array(this.vehicle1AnimArray, this.vehicle2AnimArray);

        // array of small cars
        this.cars = [];

        // array of trucks
        this.trucks = [];

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
            this.falling = this.add.text(0, this.playerPosText.height * 4, ' ');
        }

        //score text
        let scoreConfig = {
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
        this.playerScoreText = this.add.text(game.config.width/2, 0, ' ', scoreConfig).setOrigin(0.5,0);

        //create small cars
        let timer = this.time.addEvent({
            delay: 1600,
            callback: () => {
                //Find which type of vehicle
                //Random number for type of vehicle
                this.randomInt = Math.floor(Math.random() * this.vehicleType.length);

                //Random number for the color of vehicle
                this.randomInt2 = Math.floor(Math.random() * this.vehicleType.length);

                //Number for height of vehicle sprite
                this.heightNum = this.vehicleHeightArray[this.randomInt];

                //Number for width of vehicle sprite
                this.widthNum = this.vehicleWidthArray[this.randomInt];

                //create car
                let newcar = new Car(this, game.config.width + this.widthNum, game.config.height - this.heightNum, this.vehicleType[this.randomInt][this.randomInt2]).setOrigin(0, 0);
                this.add.existing(newcar);
                
                //Play animations
                newcar.anims.play(this.vehicleTypeAnim[this.randomInt][this.randomInt2]);

                this.cars.push(newcar);
            }, 
            loop: true
        });

        // create big trucks
        let timer2 = this.time.addEvent({
            delay: 4800,
            callback: () => {
                //Random number for the color of vehicle
                this.randomInt3 = Math.floor(Math.random() * this.vehicle3Array.length);

                //create car
                let newcar = new Car(this, game.config.width + 650, game.config.height - 300, this.vehicle3Array[this.randomInt3]).setOrigin(0, 0);
                this.add.existing(newcar);
                
                //Play animations
                newcar.anims.play(this.vehicle3AnimArray[this.randomInt3]);

                this.trucks.push(newcar);
            }, 
            loop: true
        });

        //GAME OVER flag
        this.gameOver = false;

        let scoretimer = this.time.addEvent({
            delay: 100,
            callback: () => {
                if(!this.gameOver){
                    this.score += 1;
                }
            },
            loop: true
        });
    }

    playerExplode(player) {
        console.log('player exploded'); 
    }

    update() {
        //check if highscore has number
        if(highScore == undefined)
        {
            highScore = 0;
        }

         //check if music is playing
         if(!bgMusic.isPlaying)
         {
             bgMusic.play();
         }

        // check key input for restart 
        if (this.gameOver) {
            if(highScore == undefined || highScore < this.score)
            {
                highScore = this.score;
            }

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
            this.add.text(game.config.width/2, game.config.height/2 - 64, 'GAME OVER', endConfig).setOrigin(0.5, 0.5);
            this.add.text(game.config.width/2, game.config.height/2, 'Highscore: ' + highScore, endConfig).setOrigin(0.5, 0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press R to return to menu', endConfig).setOrigin(0.5, 0.5);
        
            if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
                this.scene.start("menuScene");
            }
        } else {
            // check for collision between player and platforms
            if (this.player.y === game.config.height - this.player.height) {
                this.player.inAir = false;
                if (this.player.isJumping) {
                    this.player.isJumping = false;
                }
                this.player.isFalling = false;
            } else if (this.physics.world.collide(this.player, this.cars) || this.physics.world.collide(this.player, this.trucks)) {
                this.player.inAir = false;
                if (this.player.isJumping) {
                    this.player.isJumping = false;
                }
                this.player.isFalling = false;
            }else {
                this.player.inAir = true;
            }
            
            // place all necessary update calls here
            if (!this.gameOver) {   
                //background scrolling
                this.background1.tilePositionX += 2;
                this.background2.tilePositionX += 4;
                this.background3.tilePositionX += 6;

                //update player            
                this.player.update();

                //update pigeons
                if (this.pigeon1 != undefined && this.pigeon2 != undefined) {
                    this.pigeon1.update();
                    this.pigeon2.update();
                }

                // update small cars
                for (let car of this.cars) {
                    car.update();
                    // head on collision with car here
                    if(this.checkCollision(this.player, car)) {
                        this.sound.play('hit_sfx');
                        this.player.destroy();
                        this.gameOver = true;
                    }

                    // car is removed after going out of bounds
                    if (car.x + car.width < 0) {
                        Phaser.Utils.Array.Remove(this.cars, car);
                        car.destroy();
                    }
                }

                // update trucks
                for (let car of this.trucks) {
                    car.update();
                    // head on collision with car here
                    if(this.checkCollision(this.player, car) ){
                        this.sound.play('hit_sfx');
                        this.player.destroy();
                        this.gameOver = true;
                    }

                    // car is removed after going out of bounds
                    if (car.x + car.width < 0) {
                        Phaser.Utils.Array.Remove(this.trucks, car);
                        car.destroy();
                    }
                }
                    
                //update score text
                this.playerScoreText.text = 'Score: ' + this.score + ' | Highscore: ' + highScore;
            }

            let keyR = this.input.keyboard.addKey('R');
            if (this.debug && keyR.isDown) {
                this.scene.restart();
            }


            // check collision between player and pigeons
            if (this.checkCollision(this.player, this.pigeon1)) {
                this.sound.play('hit_sfx');
                this.player.destroy();
                this.gameOver = true;
            }

            if (this.checkCollision(this.player, this.pigeon2)) {
                this.sound.play('hit_sfx');
                this.player.destroy();
                this.gameOver = true;
            }

            // update debug text
            if (this.debug) {
                this.playerPosText.text = 'position: ' + this.player.x + ', ' + this.player.y;
                this.playerIsJump.text = 'isJumping: ' + this.player.isJumping;
                this.airText.text = 'inAir: ' + this.player.inAir;
                this.falling.text = 'isFalling: ' + this.player.isFalling;
                this.jRelease.text = 'jumpRelease: ' + this.player.jumpRelease;
            }
        }
    }

    onWorldBounds(body) {
        this.player.inAir = false;
    }

    checkCollision(player, object) {
        // borrowed collision check from rocket patrol tutorial
        // checks that object exists
        if(object != undefined) {
            if (player.x < object.x + object.width && 
                player.x + player.width > object.x && 
                player.y < object.y + object.height &&
                player.height + player.y > object. y) {
                    return true;
            } else {
                return false;
            }
        }
    }

}
