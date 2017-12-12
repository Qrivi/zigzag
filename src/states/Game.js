import Phaser from 'phaser'

import Tile from '../classes/Tile.js'
import Player from '../classes/Player.js'

export default class extends Phaser.State {
    constructor() {
        super();
        this.tileSize = 50;
        this.playerSpeed = 3;
    }

    create() {
        this.tiles = this.game.add.group();
        this.game.add.existing( this.tiles );

        for( let i = 0; i < Math.ceil( this.game.height / this.tileSize * 2 ); i++ )
            this.addTile( this.tiles.getAt( 0 ) );

        this.startX = this.world.centerX;
        this.startY = this.world.centerY + 150;
        this.player = new Player( {
            game: this.game,
            x: this.startX,
            y: this.startY,
            speed: this.playerSpeed
        } );
        this.game.add.existing( this.player );

        this.game.physics.startSystem( Phaser.Physics.ARCADE );
        this.game.physics.enable( this.tiles );
        this.game.physics.enable( this.player );
        this.game.camera.follow( this.player, Phaser.Camera.FOLLOW_TOPDOWN );

        const spacebar = game.input.keyboard.addKey( Phaser.Keyboard.SPACEBAR );
        spacebar.onDown.add( () => this.player.turn() );
    }

    render() {
        this.game.world.setBounds( 0, 0 + this.player.y - this.startY, this.game.width, this.game.height );
        this.game.debug.cameraInfo( this.game.camera, 32, 32 );
    }

    addTile( preceder ) {
        console.log( 'Adding a tile' );
        let offset = this.tileSize;

        if( preceder && preceder < 1 )
            preceder = false;
        else if( preceder && preceder.x >= this.game.width - this.tileSize * 2 )
            offset = -this.tileSize;
        else if( preceder && preceder.x >= this.tileSize * 2 )
            offset *= ( ( Math.round( this.game.rnd.integerInRange( 0, 1 ) ) % 2 ) ? 1 : -1 );

        let tile = new Tile( {
            game: this.game,
            preceder: preceder,
            size: this.tileSize,
            offset: offset
        } );

        tile.events.onKilled.addOnce( () => { this.addTile( this.tiles.getAt( 0 ) ); } );

        this.tiles.addChildAt( tile, 0 );
    }
}
