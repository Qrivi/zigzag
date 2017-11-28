import 'pixi'
import 'p2'
import Phaser from 'phaser'

import BootState from './states/Boot'
import SplashState from './states/Splash'
import GameState from './states/Game'

import config from './config'

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
