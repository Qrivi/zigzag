import Phaser from 'phaser'

export default class extends Phaser.Sprite {
    constructor( { game, x, y, asset } ) {
        super( game, x, y, asset, 1 );
        this.anchor.setTo( .5 );
        this.scale.setTo( .85 );

        this.animations.add( 'default', [ 0 ] );
        this.animations.add( 'left', [ 1 ] );
        this.animations.add( 'right', [ 2 ] );
        this.animations.play( 'default' );
    }

    turn() {
        console.log( 'turn' )
        if( this.animations.currentAnim.name === 'right' )
            this.animations.play( 'left' );
        else
            this.animations.play( 'right' );
    }
}
