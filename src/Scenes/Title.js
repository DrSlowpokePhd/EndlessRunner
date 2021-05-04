class Title extends Phaser.Scene {
    constructor() {
        super("titleScene");
    }

    preload() {
        // load audio
        this.load.audio('sfx_select','./Assets/sounds/endlessRunner_Select.wav');

        //load image
        this.load.image('background_title', './Assets/backgrounds/endlessRunnerTitle.png');
    }
    create() { 
        this.background = this.add.tileSprite(0, 0, 1280, 720, 'background_title').setOrigin(0, 0);


        // title text
        let titleConfig = {
            fontFamily: 'Bread Rough',
            fontSize: '80px',
            backgroundColor: '#85451c',
            color: '#c49a6c',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
                left: 5,
                right: 5,
            },
            fixedWidth: 0
        }
        this.add.text(game.config.width/2, 75, 'Bread Runner', titleConfig).setOrigin(0.5);

        // play text
        let playtextConfig = {
            fontFamily: 'Bread and Circus',
            fontSize: '32px',
            backgroundColor: '#85451c',
            color: '#c49a6c',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
                left: 5,
                right: 5,
            },
            fixedWidth: 0
        }
        this.add.text(game.config.width/2, game.config.height - 50, 'Press SPACE to start.', playtextConfig).setOrigin(0.5);
	
        // inputs
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }
    update() {
  	    if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.sound.play('sfx_select');
  	        this.scene.start('menuScene');
  	    }
    }
}
