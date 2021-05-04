class Pigeon extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);   //adds to existing scene
        //this.points = 1;   //stores pointValue
        this.moveSpeed = 5;         //pixels per frame birds move at
    }

    update() {
        //birds move left
        this.x += this.moveSpeed;

        //if bird hits end of screen, reset to other side
        if(this.x >= game.config.width + this.width) {
            this.x = 0 - 50;
        }
    }

    moveSpeedFast() {
        this.moveSpeed += 1;
    }

    //all code here was borrowed from the Rocket Patrol Tutorial

}