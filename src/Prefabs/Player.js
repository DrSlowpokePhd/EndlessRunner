/**
 * @class       : Player
 * @author      : jamesd (jamesd@$HOSTNAME)
 * @created     : Tuesday Apr 20, 2021 11:46:32 PDT
 * @description : Player
 */

class Player extends Phaser.Physics.Arcade.Sprite {
    constructor (scene, x, y, texture, frame) {
        super (scene, x, y, texture, frame);
        this.jumpStep = 1300; // change in height measured in ppt (pixels per tick)
        this.inAir = true;
        this.isFalling = true;
        this.isJumping = false;
        this.jumpRelease = true; // boolean to check if jump has been released
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setCollideWorldBounds(true);
        this.onWorldBounds = true;
        this.body.setImmovable;
    }

    update(time, delta) {
        if (keySPACE.isDown) {
            if (!this.isJumping && !this.inAir && this.jumpRelease) { // initiate jump
                this.isJumping = true;
                this.jumpRelease = false;
                this.setVelocity(0, -1 * this.jumpStep);
            } 
        } else if (keySPACE.isUp) {
            this.jumpRelease = true;
            if (this.isJumping && this.inAir) {
                this.isJumping = false;
            }
        }    

        if (!this.isFalling && this.body.velocity.y >= 0) {
            this.setVelocity(0, 120);
            this.isFalling = true;
        }
        // console.log(this.y);
    }
}
