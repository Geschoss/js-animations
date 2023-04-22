import { Point, ImageE } from '../../common/entities';
import { Env } from '../../common/module';

export class TilesE {
  private env: Env;
  private size: number;
  private image: ImageE;

  static create(env: Env, url: string, size: number) {
    return new TilesE(env, url, size);
  }

  private constructor(env: Env, url: string, size: number) {
    this.env = env;
    this.size = size;
    this.image = new ImageE(url);
  }

  isReady() {
    return this.image.isReady();
  }

  renderFloor(ctx: CanvasRenderingContext2D, point: Point) {
    ctx.drawImage(
      this.image.data(),
      this.size * 2,
      0,
      this.size,
      this.size,
      point.x,
      point.y,
      this.env.tile_dimensions.x,
      this.env.tile_dimensions.y
    );
  }

  renderWall(ctx: CanvasRenderingContext2D, point: Point) {
    ctx.drawImage(
      this.image.data(),
      this.size * 2,
      this.size * 2,
      this.size,
      this.size,
      point.x,
      point.y,
      this.env.tile_dimensions.x,
      this.env.tile_dimensions.y
    );
  }

  renderPlayer(ctx: CanvasRenderingContext2D, point: Point) {
    ctx.save();
    ctx.fillStyle = '#00ff00';
    ctx.beginPath();
    ctx.rect(
      point.x,
      point.y,
      this.env.tile_dimensions.x,
      this.env.tile_dimensions.y
    );
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
}
