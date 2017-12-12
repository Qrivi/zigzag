import Phaser from 'phaser'

import Tile from '../classes/Tile.js'
import Player from '../classes/Player.js'

export default class extends Phaser.State {
    create() {
        // set game variables
        this.tileSize = 50;
        this.playerSpeed = 2.5;
        this.playerTolerance = 5;
        this.startX = this.world.centerX;
        this.startY = this.game.height * .65;

        // add tiles
        this.tiles = this.game.add.group();
        this.game.add.existing( this.tiles );

        for( let i = 0; i < Math.ceil( this.game.height / this.tileSize * 2 ); i++ )
            this.addTile( this.tiles.getAt( 0 ) );

        // add player
        this.player = new Player( {
            game: this.game,
            x: this.startX,
            y: this.startY,
            speed: this.playerSpeed
        } );
        this.game.add.existing( this.player );
        this.game.camera.follow( this.player, Phaser.Camera.FOLLOW_TOPDOWN );

        // add controls
        const spacebar = game.input.keyboard.addKey( Phaser.Keyboard.SPACEBAR );
        spacebar.onDown.add( () => this.player.turn() );
    }

    render() {
        this.game.world.setBounds( 0, 0 + this.player.y - this.startY, this.game.width, this.game.height );
        this.game.debug.cameraInfo( this.game.camera, 32, 32 );
    }

    update() {
        if( this.player.running ) {
            let tileHits = 0;
            let hitPoints = [
                new Phaser.Point( this.player.x - this.player.width / 2 + this.playerTolerance, this.player.y ),
                new Phaser.Point( this.player.x + this.player.width / 2 - this.playerTolerance, this.player.y )
            ];
            this.tiles.forEach( tile => {
                if( tile.accessible )
                    tileHits += tile.contains( hitPoints );
            } );

            console.log( 'tile hits:', tileHits );

            if( tileHits < 2 ) {
                console.log( 'u r ded bro xD' );
                this.player.alive = false;
                this.tiles.forEach( tile => tile.alive = false );
            }
        }
    }

    addTile( preceder ) {
        //console.log( 'Adding a tile' );
        let offset = this.tileSize;

        if( preceder && preceder < 1 )
            preceder = false;
        else if( preceder && preceder.posX >= this.game.width - this.tileSize * 2 )
            offset = -this.tileSize;
        else if( preceder && preceder.posX >= this.tileSize * 2 )
            offset *= ( ( Math.round( this.game.rnd.integerInRange( 0, 1 ) ) % 2 ) ? 1 : -1 );

        let tile = new Tile( {
            game: this.game,
            preceder: preceder,
            size: this.tileSize,
            offset: offset,
            hotspot: this.startY
        } );

        tile.events.onDestroy.addOnce( () => {
            this.addTile( this.tiles.getAt( 0 ) );
        } );

        this.tiles.addChildAt( tile, 0 );
    }
}
