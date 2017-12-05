import Phaser from 'phaser'
import config from '../config.js'

export default class Tile extends Phaser.Graphics {
    constructor( { game, preceder, offset } ) {
        if( preceder ) {
            super( game, preceder.x + offset, preceder.y - config.tileSize * .5 )
            this.size = config.tileSize;
            this.offset = offset;
        } else {
            super( game, game.width / 2, game.height - 400 );
            this.size = config.tileSize * 4;
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
