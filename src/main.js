import 'pixi'
import 'p2'
import Phaser from 'phaser'

import config from './config'

class Game extends Phaser.Game {
    constructor() {
        super( config.gameWidth, config.gameHeight, Phaser.AUTO, 'content', null )
        this.state.add( 'Game', GameState );
        this.state.start( 'Game' );
    }
}

class GameState extends Phaser.State {
    init() {
        console.log( `init` );
    }
    preload() {
        console.log( `preload` );
    }
    create() {
        console.log( `create` );
    }
    update() {
        // console.log( `update` );
    }
    render() {
        // console.log( `render` );
    }
}

window.game = new Game()
