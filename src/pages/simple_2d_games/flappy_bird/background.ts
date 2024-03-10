import { Env } from 'src/entities/engine/2d/engine';
import { Asset } from 'src/entities/engine/assets';
import { Brick } from 'src/pages/simple_2d_games/flappy_bird/floor';
import { a_initByCb, a_last } from 'src/shared/lib/array';

export class Background {
  private width = 288;
  private height = 512;
  private speed = 0.2;

  asset: Asset;

  bricks: Brick[];

  env: Env;

  constructor(env: Env, asset: Asset) {
    this.env = env;
    this.asset = asset;
    this.bricks = this.init_bricks();
  }

  private init_bricks() {
    let bricks_count = Math.ceil(this.env.width / this.width) + 1;
    let start_i = -1;
    return a_initByCb(bricks_count, (i) => {
      let curr_i = start_i + i;
      return new Brick({
        x: (this.width - 1) * curr_i, // dont ask why
        y: 0,
        sw: this.width,
        sh: this.height,
        dw: this.width,
        dh: this.env.height,
        asset: this.asset,
      });
    });
  }

  think() {
    let first = this.bricks[0];
    if (first.left >= -30) {
      this.bricks.pop();
      this.bricks.unshift(
        new Brick({
          x: -1 * (first.left + this.width) - 1, // dont ask why
          y: 0,
          sw: this.width,
          sh: this.height,
          dw: this.width,
          dh: this.env.height,
          asset: this.asset,
        })
      );
    }
    this.bricks.forEach((brick) => {
      brick.think(this.speed);
    });
  }

  render(ctx: CanvasRenderingContext2D) {
    this.bricks.forEach((brick) => {
      brick.render(ctx);
    });
  }

  reset() {
    this.bricks = this.init_bricks();
  }
}
