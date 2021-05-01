class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        // load audio

    }
    create() { 
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
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'Endless Runner Prototype', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, 'Press SPACE to start.', menuConfig).setOrigin(0.5);
	
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    	
    }
    update() {
  	    if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
  	        this.scene.start('playScene');
  	    }
    }
}
