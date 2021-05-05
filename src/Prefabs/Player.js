/**
 * @class       : Player
 * @author      : jamesd (jamesd@$HOSTNAME)
 * @created     : Tuesday Apr 20, 2021 11:46:32 PDT
 * @description : Player
 */

class Player extends Phaser.Physics.Arcade.Sprite {
    constructor (scene, x, y, texture, frame) {
        super (scene, x, y, texture, frame);
        this.jumpStep = 900; // change in height measured in ppt (pixels per tick)
        this.inAir = true;
        this.isFalling = true;
        this.isJumping = false;
        this.jumpRelease = true; // boolean to check if jump has been released
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setCollideWorldBounds(true);
        // TODO: implement collision behavior with ALL pigeons = game over (or life - 1)
        
        // this.onWorldBounds = true;
        // see Car.js
        this.body.setImmovable;

    }

    update(time, delta) {
        //left/right movement
        if(keyLEFT.isDown && this.x >= this.width)
        {
            this.x -= 7;
        } 
        else if (keyRIGHT.isDown && this.x <= game.config.width - this.width)
        {
            this.x += 7;
        }

        //jump
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
