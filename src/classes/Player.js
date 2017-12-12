import Phaser from 'phaser'

export default class extends Phaser.Sprite {
    constructor( { game, x, y, speed } ) {
        super( game, x, y, 'player', 1 );
        this.anchor.setTo( .5 );
        this.scale.setTo( .85 );

        this.speed = speed;
        this.running = false;
        this.hitArea = new Phaser.Rectangle( 0, 50, 42, 12 );

        this.animations.add( 'default', [ 0 ] );
        this.animations.add( 'left', [ 1 ] );
        this.animations.add( 'right', [ 2 ] );
        this.animations.play( 'default' );
    }

    getBounds() {
        return this.hitArea;
    }

    update() {
        if( this.running && this.alive ) {
            this.y -= this.speed * .5;
            if( this.animations.currentAnim.name === 'right' )
                this.x += this.speed;
            else if( this.animations.currentAnim.name === 'left' )
                this.x -= this.speed;
        }
    }

    turn() {
        this.running = true;
        if( this.animations.currentAnim.name === 'right' )
            this.animations.play( 'left' );
        else
            this.animations.play( 'right' );
    }
}
