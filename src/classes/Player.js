import Phaser from 'phaser'

export default class extends Phaser.Sprite {
    constructor( { game, x, y, speed } ) {
        super( game, x, y, 'player', 1 );
        this.anchor.setTo( .5, .85 );
        this.scale.setTo( .85 );

        this.speed = speed;
        this.running = false;

        this.animations.add( 'default', [ 0 ] );
        this.animations.add( 'left', [ 1 ] );
        this.animations.add( 'right', [ 2 ] );
        this.animations.play( 'default' );
    }

    update() {
        if( this.alive ) {
            if( this.running ) {
                this.y -= this.speed * .5;
                if( this.animations.currentAnim.name === 'right' )
                    this.x += this.speed;
                else if( this.animations.currentAnim.name === 'left' )
                    this.x -= this.speed;
            }
        } else {
            // dead
            this.running = false;
        }
    }

    turn() {
        if( this.alive ) {
            this.running = true;
            if( this.animations.currentAnim.name === 'right' )
                this.animations.play( 'left' );
            else
                this.animations.play( 'right' );
        }
    }
}
