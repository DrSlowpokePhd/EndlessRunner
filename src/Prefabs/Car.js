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
        // TODO: change collision behavior to collide only with the floor (make a floor sprite?) instead of all bounds

    }

    update() {
        this.x -= this.moveSpeed; 
        this.y = this.yLevel; // TODO: When collision with floor is implemented, we can get rid of this line
        
    }
}
