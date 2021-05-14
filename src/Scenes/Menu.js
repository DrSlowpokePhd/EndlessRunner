class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        // load audio
        this.load.audio('sfx_select','./Assets/sounds/endlessRunner_Select.wav');
        
        //load image
        this.load.image('instructions', './Assets/backgrounds/instructions.png');
    }
    create() { 
        this.background = this.add.tileSprite(0, 0, 1280, 720, 'instructions').setOrigin(0, 0);

        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    	
    }
    update() {
  	    if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.sound.play('sfx_select');
  	        this.scene.start('playScene');
  	    }
    }
}
