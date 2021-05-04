class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        // load audio
        this.load.audio('sfx_select','./Assets/sounds/endlessRunner_Select.wav');

        //load image
        this.load.image('background_title', './Assets/backgrounds/endlessRunnerTitle.png');
    }
    create() { 
        this.background = this.add.tileSprite(0, 0, 1280, 720, 'background_title').setOrigin(0, 0);

        let menuConfig = {
            fontFamily: 'Arial',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
                left: 5,
                right: 5,
            },
            fixedWidth: 0
        }
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'This is the menu scene', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, 'Press SPACE to start.', menuConfig).setOrigin(0.5);
	
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    	
    }
    update() {
  	    if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.sound.play('sfx_select');
  	        this.scene.start('playScene');
  	    }
    }
}
