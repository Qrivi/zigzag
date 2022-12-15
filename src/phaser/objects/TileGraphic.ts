import Phaser from "phaser";

interface TileGraphicProps {
  scene: Phaser.Scene;
  size: number;
  preceder?: TileGraphic;
  colorSurface?: number;
  colorSides?: number;
}

export default class TileGraphic extends Phaser.GameObjects.Graphics {
  surface: Phaser.Geom.Polygon;
  relativeSurface: Phaser.Geom.Polygon;
  hasContainedPoint = false;
  private previousContainsPointResult = false;

  constructor({ scene, size, preceder, colorSurface, colorSides }: TileGraphicProps) {
    const x = preceder ? preceder.x + (Math.random() < 0.5 ? size : -size) : scene.cameras.main.centerX;
    const y = preceder ? preceder.y - size / 2 : scene.cameras.main.centerY - size / 2;
    super(scene, { x, y });

    if (preceder) this.depth = preceder.depth - 1;

    this.surface = new Phaser.Geom.Polygon([
      new Phaser.Geom.Point(0, 0),
      new Phaser.Geom.Point(size, size * 0.5),
      new Phaser.Geom.Point(0, size),
      new Phaser.Geom.Point(-size, size * 0.5),
    ]);
    this.relativeSurface = new Phaser.Geom.Polygon([
      ...this.surface.points.map((p) => new Phaser.Geom.Point(p.x + this.x, p.y + this.y)),
    ]);

    this.clear();
    // sides
    this.fillStyle(colorSides || 0x6291d4);
    this.fillPoints(this.calculateSides(this.surface).points);
    // surface
    this.fillStyle(colorSurface || 0x89c9fa);
    this.fillPoints(this.surface.points);
  }

  private calculateSides(surface: Phaser.Geom.Polygon) {
    const height = 75;
    const rightX = this.surface.points[1].x;
    const rightY = this.surface.points[1].y;
    const bottomX = this.surface.points[2].x;
    const bottomY = this.surface.points[2].y;
    const leftX = this.surface.points[3].x;
    const leftY = this.surface.points[3].y;

    return new Phaser.Geom.Polygon([
      new Phaser.Geom.Point(rightX, rightY),
      new Phaser.Geom.Point(rightX, rightY + height),
      new Phaser.Geom.Point(bottomX, bottomY + height),
      new Phaser.Geom.Point(leftX, leftY + height),
      new Phaser.Geom.Point(leftX, leftY),
    ]);
  }
}
