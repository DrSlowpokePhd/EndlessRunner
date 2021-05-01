class Car extends Phaser.Physics.Arcade.Sprite  {
    constructor(scene, x, y, texture, frame) {
        super (scene, x, y, texture, frame);
        this.moveSpeed = 8;
        this.yLevel = y;
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.onWorldBounds = true;
        this.setCollideWorldBounds(true);
    }

    update() {
        this.x -= this.moveSpeed; 
        this.y = this.yLevel;
    } 
}
