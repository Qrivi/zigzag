import Phaser from 'phaser'

export default class Tile extends Phaser.Graphics {
    constructor( { game, preceder, size, offset } ) {
        if( preceder ) {
            super( game, preceder.x + offset, preceder.y - size * .5 )
            this.size = size;
            this.offset = offset;
        } else {
            super( game, game.width / 2, game.height - 400 );
            this.size = size * 4;
            this.offset = 0;
        }

        this.game = game;
        this.preceder = preceder;

        this.polygon = new Phaser.Polygon( [
            new Phaser.Point( 0, 0 ),
            new Phaser.Point( this.size, this.size * .5 ),
            new Phaser.Point( 0, this.size ),
            new Phaser.Point( -this.size, this.size * .5 )
        ] );

        this.hitArea = this.polygon;

        this.drawSide();
        this.drawSurface();
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
        this.drawPolygon( this.polygon.points );
        this.endFill();
    }
}
