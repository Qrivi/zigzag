import Phaser from 'phaser'
import { centerGameObjects } from '../utils.js'

export default class extends Phaser.State {
    init() {}

    preload() {
        this.loaderBg = this.add.sprite( this.game.world.centerX, this.game.world.centerY, 'loaderBg' );
        this.loaderBar = this.add.sprite( this.game.world.centerX, this.game.world.centerY, 'loaderBar' );
        centerGameObjects( [ this.loaderBg, this.loaderBar ] );

        this.load.setPreloadSprite( this.loaderBar );

        // this.load.image('mushroom', 'assets/images/player.png');
        this.load.spritesheet( 'player', 'assets/images/player.png', 42, 62 );
    }

    create() {
        this.state.start( 'Game' );
    }
}
