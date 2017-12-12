import Phaser from 'phaser'

export default class Tile extends Phaser.Graphics {
    constructor( { game, preceder, size, offset } ) {
        if( preceder ) {
            super( game, preceder.x + offset, preceder.y - size * .5 );
            this.size = size;
            this.offset = offset;
        } else {
            super( game, game.width / 2, game.height - 400 );
            this.size = size * 4;
            this.offset = 0;
        }

        this.game = game;
        this.preceder = preceder;
        this.hitArea = new Phaser.Rectangle( -size, 0, size * 2, size );

        this.anchor.setTo( .5 );
        this.drawSide();
        this.drawSurface();
    }

    getBounds() {
        return this.hitArea;
    }

    update() {
        if( this.alive && this.y - this.game.camera.y > this.game.height ) {
            this.kill();
            this.destroy();
        }
    }

    drawSide() {
        this.beginFill( 0x6291D4 );
        this.drawPolygon( [
            new Phaser.Point( this.size, this.size * .5 ),
            new Phaser.Point( this.size, this.size * 2.5 ),
            new Phaser.Point( 0, this.size * 3 ),
            new Phaser.Point( -this.size, this.size * 2.5 ),
            new Phaser.Point( -this.size, this.size * .5 )
        ] );
        this.endFill();
    }

    drawSurface() {
        this.beginFill( 0x89C9FA );
        this.drawPolygon( [
            new Phaser.Point( 0, 0 ),
            new Phaser.Point( this.size, this.size * .5 ),
            new Phaser.Point( 0, this.size ),
            new Phaser.Point( -this.size, this.size * .5 )
        ] );
        this.endFill();
    }
}
