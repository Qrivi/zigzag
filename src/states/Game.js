import Phaser from 'phaser'
import config from '../config.js'
import { random } from '../utils.js'

import Tile from '../classes/Tile.js'
import Player from '../classes/Player.js'

export default class extends Phaser.State {
    constructor() {
        super();
    }

    create() {
        this.tiles = this.game.add.group();
        this.game.add.existing( this.tiles );

        this.addTile();
        for( let i = 0; i < Math.ceil( config.gameHeight / config.tileSize * 2 ); i++ )
            this.addTile( this.tiles.getAt( 0 ) );

        this.player = new Player( {
            game: this.game,
            x: this.world.centerX,
            y: this.world.centerY + 150,
            asset: 'player'
        } );
        this.game.add.existing( this.player );

        const spacebar = game.input.keyboard.addKey( Phaser.Keyboard.SPACEBAR );
        spacebar.onDown.add( () => this.player.turn() );
    }

    update() {
        // nothing here yet!
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

        this.tiles.addChildAt( tile, 0 );
    }
}
