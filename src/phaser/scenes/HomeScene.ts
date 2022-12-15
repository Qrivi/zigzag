import Phaser from "phaser";
import PlayerSprite from "../objects/PlayerSprite";
import TileGraphic from "../objects/TileGraphic";

export default class HomeScene extends Phaser.Scene {
  player!: PlayerSprite;
  tiles!: Phaser.GameObjects.Group;

  initialGameState = "loading";
  initialGameSpeed = 1;
  initialTileSize = 50;

  constructor() {
    super("homescene");
  }

  preload() {
    this.registry.set("gameState", this.initialGameState);
    this.registry.set("gameSpeed", this.initialGameSpeed);
    this.registry.set("tileSize", this.initialTileSize);

    this.load.spritesheet("player", "/assets/spritesheets/player.png", {
      frameWidth: 42,
      frameHeight: 62,
    });
  }

  create() {
    this.tiles = this.add.group();
    this.addTile();

    this.player = new PlayerSprite({
      scene: this,
    });
    this.add.existing(this.player);

    this.registry.set("gameState", "ready");

    this.input.keyboard?.on("keydown-SPACE", this.handleInteraction, this);
    this.input.on("pointerdown", this.handleInteraction, this);
  }

  update(time: number, delta: number) {
    if (this.tiles.getLength() === 0) return;
    const oldestTile = this.tiles.children.entries[0] as TileGraphic;
    const newestTile = this.tiles.children.entries[this.tiles.getLength() - 1] as TileGraphic;
    const offset = this.cameras.main.worldView.height / 10;
    // basically with how much offset, relative to the viewport, adding and removing tiles should happen.
    // e.g. height/5 essentially moves the whole is-in-viewport check down by 10%.

    if (!this.cameras.main.worldView.contains(oldestTile.x, oldestTile.y - offset)) {
      // console.log("Oldest tile no longer visible. Destroying that one...");
      oldestTile.destroy();
    }

    if (this.cameras.main.worldView.contains(newestTile.x, newestTile.y - offset)) {
      // console.log("Newest tile is visible. Adding another one...");
      this.addTile();
    }

    // Check if player hits a tile
    const hasFoot = this.tiles.children.entries.some((tile) =>
      (tile as TileGraphic).relativeSurface.contains(this.player.x, this.player.y),
    );
    if (!hasFoot) this.registry.set("gameState", "dead");
  }

  private handleInteraction() {
    switch (this.registry.get("gameState")) {
      case "ready":
        this.cameras.main.startFollow(this.player);
        this.registry.set("gameState", "alive");
        break;
      case "alive":
        this.player.changeDirection();
        break;
      case "dead":
        this.scene.restart();
        break;
    }
  }

  private addTile() {
    const preceder = this.tiles.children.entries[this.tiles.getLength() - 1] as TileGraphic;

    const tile = new TileGraphic({
      scene: this,
      size: preceder ? this.registry.get("tileSize") : this.registry.get("tileSize") * 3,
      preceder,
    });

    tile.scale = 0;
    this.tweens.add({
      targets: tile,
      scale: 1,
      duration: 1000,
      ease: "Sine",
    });

    this.add.existing(tile);
    this.tiles.add(tile);
  }
}
