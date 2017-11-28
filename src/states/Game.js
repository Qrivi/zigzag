import Phaser from 'phaser'

import Tile from '../classes/Tile.js'

export default class extends Phaser.State {
    init() {}
    preload() {}

    create() {
        this.mushroom = new Tile( {
            game: this.game,
            x: this.world.centerX,
            y: this.world.centerY,
            asset: 'mushroom'
        } )

        this.game.add.existing( this.mushroom )
    }

    render() {
        //if (__DEV__)
        //  this.game.debug.spriteInfo(this.mushroom, 32, 32)
    }
}
