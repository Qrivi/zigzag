import Phaser from 'phaser'
import config from '../config.js'
import { random } from '../utils.js'

import Tile from '../classes/Tile.js'

export default class extends Phaser.State {
    constructor() {
        super();
        this.tiles = [];
    }

    create() {
        this.addTile();
        const max = Math.ceil( config.gameHeight / config.tileSize * 2 );
        for( let i = 0; i < max; i++ )
            this.addTile( this.tiles[ this.tiles.length - 1 ] );
    }

    update() {
        // nothing here!
    }

    addTile( preceder ) {
        let offset = config.tileSize;
        if( preceder && preceder.x >= config.gameWidth - config.tileSize * 2 )
            offset = -config.tileSize;
        else if( preceder && preceder.x >= config.tileSize * 2 )
            offset *= ( ( Math.round( random( 0, 2 ) ) % 2 ) ? 1 : -1 );

        let tile = new Tile( {
            game: this.game,
            preceder: preceder,
            offset: offset
        } );

        this.tiles.push( tile );
        this.game.add.existing( tile );
        this.game.world.sendToBack( tile );
    }
}
