class Car extends Phaser.Physics.Arcade.Sprite  {
    constructor(scene, x, y, texture, frame) {
        super (scene, x, y, texture, frame);
        this.moveSpeed = 8;
        this.yLevel = y;
        scene.add.existing(this);
        scene.physics.add.existing(this);
        // this.onWorldBounds = true;
        // this line of code isn't actually doing anything
        // I think the onWorldBounds is an event, not something that modifies a property
        this.setCollideWorldBounds(true);
        // TODO: change this.setCollideWorldBounds(true) to something else that makes cars only
        //       collide with the floor instead of all bounds

    }

    update() {
        this.x -= this.moveSpeed; 
        this.y = this.yLevel;
    } 
}
