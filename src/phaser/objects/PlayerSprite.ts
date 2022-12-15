import Phaser from "phaser";

interface PlayerSpriteProps {
  scene: Phaser.Scene;
}

export default class PlayerSprite extends Phaser.GameObjects.Sprite {
  private goLeft = false;

  constructor({ scene }: PlayerSpriteProps) {
    super(scene, scene.cameras.main.centerX, scene.cameras.main.centerY, "player");

    this.setOrigin(0.5, 0.85);

    this.anims.create({
      key: "idle",
      frames: this.anims.generateFrameNumbers("player", {
        frames: [0],
      }),
      frameRate: 2,
      repeat: -1,
    });
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("player", {
        frames: [1],
      }),
      frameRate: 2,
      repeat: -1,
    });
    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("player", {
        frames: [2],
      }),
      frameRate: 2,
      repeat: -1,
    });
    this.anims.play("idle");

    scene.registry.events.on("changedata", this.handleRegistryEvent, this);
  }

  private handleRegistryEvent() {
    if (!this.scene) return; // The scene was destroyed since the event. Most likely because of a restart.

    switch (this.scene.registry.get("gameState")) {
      case "ready":
        this.anims.play("idle");
        break;
      case "alive":
        this.anims.play("right");
        break;
    }
  }

  changeDirection() {
    if (this.scene.registry.get("gameState") === "alive") {
      this.anims.play(this.anims.currentAnim?.key === "right" ? "left" : "right");
    }
  }

  preUpdate(time: number, delta: number) {
    super.preUpdate(time, delta);

    if (this.scene.registry.get("gameState") === "alive") {
      const currentGameSpeed = this.scene.registry.get("gameSpeed");

      if (this.anims.currentAnim?.key === "right") {
        this.x += currentGameSpeed;
        this.y -= currentGameSpeed * 0.5;
      } else if (this.anims.currentAnim?.key === "left") {
        this.x -= currentGameSpeed;
        this.y -= currentGameSpeed * 0.5;
      }
    }
  }
}
