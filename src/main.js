import 'pixi'
import 'p2'
import Phaser from 'phaser'
import config from './config.js'

import BootState from './states/Boot.js'
import SplashState from './states/Splash.js'
import GameState from './states/Game.js'

class Game extends Phaser.Game {
    constructor() {
        super( config.gameWidth, config.gameHeight, Phaser.AUTO, 'content', null );

        this.state.add( 'Boot', BootState );
        this.state.add( 'Splash', SplashState );
        this.state.add( 'Game', GameState );

        this.state.start( 'Boot' );
    }
}

window.game = new Game();
