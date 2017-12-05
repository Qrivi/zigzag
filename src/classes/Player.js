import Phaser from 'phaser'

export default class extends Phaser.Sprite {
    constructor( { game, x, y, asset } ) {
        super( game, x, y, asset, 1 );
        this.anchor.setTo( .5 );
        this.scale.setTo( .85 );

        this.velocity = 3;
        this.running = false;

        this.animations.add( 'default', [ 0 ] );
        this.animations.add( 'left', [ 1 ] );
        this.animations.add( 'right', [ 2 ] );
        this.animations.play( 'default' );
    }

    update() {
        if( this.running && this.alive ) {
            this.y -= this.velocity * .5;
            if( this.animations.currentAnim.name === 'right' )
                this.x += this.velocity;
            else if( this.animations.currentAnim.name === 'left' )
                this.x -= this.velocity;
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
