class Pigeon extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);   //adds to existing scene
        //this.points = 1;   //stores pointValue
        this.moveSpeed = 6;         //pixels per frame birds move at
    }

    update() {
        //birds move right
        this.x -= this.moveSpeed;

        //if bird hits end of screen, reset to other side
        if(this.x <= 0 - this.width) {
            this.x = game.config.width;
            this.y = Math.random() * (250) + 50;
        }
    }

    reset() {
        this.x = game.config.width + 50;
        this.alpha = 1;
    }

    moveSpeedFast() {
        this.moveSpeed += 1;
    }

    //all code here was borrowed from the Rocket Patrol Tutorial

}