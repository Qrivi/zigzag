import Phaser from 'phaser'

export default class Tile extends Phaser.Graphics {
    constructor( { game, preceder, size, offset, hotspot } ) {
        super( game, 0, 0 );

        this.game = game;
        this.preceder = preceder;

        this.size = ( preceder ? size : size * 4 );
        this.posX = ( preceder ? preceder.posX + offset : game.width / 2 );
        this.posY = ( preceder ? preceder.posY - size * .5 : hotspot - size * 2 );

        this.hotspot = hotspot;
        this.accessible = false;
        this.passed = false;

        this.surface = new Phaser.Polygon( [
            new Phaser.Point( this.posX, this.posY ),
            new Phaser.Point( this.posX + this.size, this.posY + this.size * .5 ),
            new Phaser.Point( this.posX, this.posY + this.size ),
            new Phaser.Point( this.posX - this.size, this.posY + this.size * .5 )
        ] );

        this.draw();
    }

    update() {
        if( this.alive ) {
            const pos = this.posY - this.game.camera.y;

            if( pos > this.game.height ) {
                this.destroy();
            } else if( pos > this.hotspot ) {
                this.accessible = false;
                this.passed = true;
            } else if( pos > this.hotspot - this.size ) {
                this.accessible = true;
                this.passed = false;
            } else {
                this.accessible = false;
                this.passed = false;
            }
        }

        // this.draw();
    }

    contains( points ) {
        let hits = 0;
        points.forEach( point => {
            if( this.surface.contains( point.x, point.y ) )
                hits++;
        } );
        return hits;
    }

    draw( colorSurface, colorSide ) {
        if( !colorSurface )
            colorSurface = 0x89C9FA;
        if( !colorSide )
            colorSide = 0x6291D4;
        this.clear();

        // side
        this.beginFill( colorSide );
        this.drawPolygon( [
            new Phaser.Point( this.posX + this.size, this.posY + this.size * .5 ),
            new Phaser.Point( this.posX + this.size, this.posY + this.size * 2.5 ),
            new Phaser.Point( this.posX, this.posY + this.size * 3 ),
            new Phaser.Point( this.posX - this.size, this.posY + this.size * 2.5 ),
            new Phaser.Point( this.posX - this.size, this.posY + this.size * .5 )
        ] );
        this.endFill();

        // surface
        this.beginFill( colorSurface );
        this.drawPolygon( this.surface );
        this.endFill();
    }
}
