import Phaser from 'phaser';

export default class Tile {
    constructor( preceder ) {
        this.preceder = preceder;
        this.size = preceder ? 1 : 5;
    }

    destroy() {
        // TODO animatie, vb naar beneden vallen, afbrokkenen?
    }
}
