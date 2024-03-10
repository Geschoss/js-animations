import { Env } from 'src/entities/engine/2d/engine';
import { Rect } from 'src/entities/engine/2d/entities';
import { Asset } from 'src/entities/engine/assets';
import { Bird } from 'src/pages/simple_2d_games/flappy_bird/bird';
import { a_initByCb, a_last } from 'src/shared/lib/array';

export class Floor {
  private width = 336;
  private height = 122;
  private dh = 132;
  private speed = 3;

  bricks: Brick[];

  rect: Rect;
  asset: Asset;

  constructor(env: Env, asset: Asset) {
    this.asset = asset;

    this.rect = new Rect(
      0,
      env.height - this.height,
      env.width,
      this.height,
      '#0000ff'
    );

    this.bricks = this.init_bricks();
  }

  private init_bricks() {
    let bricks_count = Math.ceil(this.rect.width / this.width) + 1;
    return a_initByCb(bricks_count, (i) => {
      return new Brick({
        x: this.width * i,
        y: this.rect.y,
        sw: this.width,
        sh: this.height,
        dw: this.width,
        dh: this.dh,
        asset: this.asset,
      });
    });
  }

  think() {
    let first = this.bricks[0];
    let last = a_last(this.bricks);
    if (first.rigth < 0) {
      this.bricks.shift();
      this.bricks.push(
        new Brick({
          x: last.rigth,
          y: this.rect.y,
          sw: this.width,
          sh: this.height,
          dw: this.width,
          dh: this.dh,
          asset: this.asset,
        })
      );
    }
    this.bricks.forEach((brick) => {
      brick.think(-this.speed);
    });
  }

  reset() {
    this.bricks = this.init_bricks();
  }

  collision(bird: Bird) {
    if (this.rect.y <= bird.rect.y + bird.rect.height) {
      return true;
    }
    return false;
  }

  render(ctx: CanvasRenderingContext2D) {
    // this.rect.render(ctx);

    this.bricks.forEach((brick) => {
      brick.render(ctx);
    });
  }
}

export class Brick {
  private x: number;
  private y: number;

  private sw: number;
  private sh: number;

  private dw: number;
  private dh: number;

  private asset: Asset;

  constructor({
    x,
    y,
    sw,
    sh,
    dw = sw,
    dh = sh,
    asset,
  }: {
    x: number;
    y: number;
    sw: number;
    sh: number;
    dw: number;
    dh: number;
    asset: Asset;
  }) {
    this.x = x;
    this.y = y;
    this.sw = sw;
    this.sh = sh;
    this.dw = dw;
    this.dh = dh;
    this.asset = asset;
  }

  get rigth() {
    return this.x + this.dw;
  }

  get left() {
    return this.x;
  }

  think(offset: number) {
    this.x = this.x + offset;
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.drawImage(
      this.asset.data,
      0,
      0,
      this.sw,
      this.sh,
      this.x,
      this.y,
      this.dw,
      this.dh
    );
    ctx.restore();
  }
}
