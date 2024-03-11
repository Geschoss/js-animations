import { Behavior, LinearMove } from 'src/entities/engine/2d/behaviors';
import { Env } from 'src/entities/engine/2d/engine';
import { Rect } from 'src/entities/engine/2d/entities';
import { Asset } from 'src/entities/engine/assets';
import { Bird } from 'src/pages/simple_2d_games/flappy_bird/bird';
import { Floor } from 'src/pages/simple_2d_games/flappy_bird/floor';
import { Score } from 'src/pages/simple_2d_games/flappy_bird/score';
import { r_range } from 'src/shared/lib';

export class Pipe {
  static GAP = 290;
  static WIDTH = 90;
  static MIN_HEIGHT = 60;
  static DISTANCE_BEETWEN = 290;
  static SPEED = -4;
  static ASSET_HEIGHT = 320;

  x: number;
  y: number;
  top: Rect;
  bottom: Rect;
  asset: Asset;
  behavior: Behavior<Pipe>;

  type: 'passed' | 'current' | 'next';

  constructor(
    asset: Asset,
    x: number,
    y: number,
    height: number,
    score: number = 0
  ) {
    this.type = 'next';
    this.asset = asset;
    this.x = x;
    this.y = y;
    this.behavior = new LinearMove(Pipe.SPEED - score / 10);
    let gap = Pipe.GAP - score;

    let top_height = r_range(
      Pipe.MIN_HEIGHT,
      height - gap - 2 * Pipe.MIN_HEIGHT
    );
    this.top = Rect.create({
      x: x,
      y: y,
      width: Pipe.WIDTH,
      height: top_height,
    });

    let bottom_y = this.top.bottom + gap;
    let bottom_height = height - bottom_y;
    this.bottom = Rect.create({
      x: this.top.x,
      y: bottom_y,
      width: Pipe.WIDTH,
      height: bottom_height,
    });
  }

  think() {
    this.behavior.think(this);
    this.top.x = this.x;
    this.bottom.x = this.x;
  }

  render(ctx: CanvasRenderingContext2D) {
    this.top.render(ctx);
    this.bottom.render(ctx);

    // bottom
    ctx.save();
    ctx.drawImage(
      this.asset.data,
      0,
      0,
      51,
      Pipe.ASSET_HEIGHT,
      this.bottom.x,
      this.bottom.y,
      this.bottom.width,
      this.bottom.height
    );
    ctx.restore();

    // top
    ctx.save();
    ctx.translate(
      this.top.x + this.top.width / 2,
      this.top.y + this.top.height / 2
    );
    ctx.rotate(Math.PI);
    let dx = (this.top.width / 2) * -1;
    let dy = (this.top.height / 2) * -1;

    ctx.drawImage(
      this.asset.data,
      0,
      0,
      51,
      Pipe.ASSET_HEIGHT,
      dx,
      dy,
      this.top.width,
      this.top.height
    );

    ctx.restore();
  }

  collision(bird: Rect) {
    /*
       bird 
      A*--*B
       |  |
      C*--*D 
      
       pipe
    x,y|   |
       |___|
     TPA     TPB

     TPC ___ TPD
        |   |
    */
    let A = { x: bird.x, y: bird.y };
    let B = { x: bird.x + bird.width, y: bird.y };
    let C = { x: bird.x, y: bird.y + bird.height };
    let D = { x: bird.x + bird.width, y: bird.y + bird.height };
    let TPA = { x: this.top.x, y: this.top.y + this.top.height };
    let TPB = { x: this.top.x + Pipe.WIDTH, y: this.top.y + this.top.height };
    let TPC = { x: this.bottom.x, y: this.bottom.y };
    let TPD = { x: this.bottom.x + Pipe.WIDTH, y: this.bottom.y };

    if (B.x < this.x) {
      return false;
    }
    if (this.x + Pipe.WIDTH < bird.x) {
      return false;
    }

    if (beetwen(TPA.x, B.x, TPB.x) && beetwen(this.y, B.y, TPA.y)) {
      return true;
    }
    if (beetwen(TPA.x, A.x, TPB.x) && beetwen(this.y, A.y, TPA.y)) {
      return true;
    }

    if (beetwen(TPC.x, D.x, TPD.x) && TPC.y < D.y) {
      return true;
    }

    if (beetwen(TPC.x, C.x, TPD.x) && TPC.y < C.y) {
      return true;
    }

    return false;
  }
}

export class Plumbing {
  private h_padding = 40;
  env: Env;
  pipes: Pipe[];
  floor: Floor;
  asset: Asset;

  constructor(floor: Floor, env: Env, asset: Asset) {
    this.env = env;
    this.floor = floor;
    this.asset = asset;

    this.reset();
  }

  reset() {
    let result = [];
    let x_position = this.env.width;
    let y_position = this.h_padding;
    let screen_height = this.env.height - this.floor.rect.height;

    let max_pipe = screen.width / (Pipe.WIDTH + Pipe.DISTANCE_BEETWEN) + 1;
    for (let i = 0; i < max_pipe; i++) {
      result.push(new Pipe(this.asset, x_position, y_position, screen_height));
      x_position += Pipe.WIDTH + Pipe.DISTANCE_BEETWEN;
    }

    this.pipes = result;
  }

  collision(bird: Bird) {
    return this.pipes.some((pipe) => pipe.collision(bird.rect));
  }

  isPassed(bird: Bird) {
    for (let pipe of this.pipes) {
      if (pipe.type === 'passed') {
        continue;
      }

      if (pipe.type === 'current') {
        if (pipe.x + Pipe.WIDTH <= bird.rect.x) {
          pipe.type = 'passed';
          return true;
        }
      }

      if (pipe.x <= bird.rect.x + bird.rect.width) {
        pipe.type = 'current';
      }
      return false;
    }
    let first = this.pipes[0];

    return first.x + Pipe.WIDTH < bird.rect.x;
  }

  think(score: Score) {
    this.pipes.forEach((pipe) => pipe.think());
    let first = this.pipes[0];
    let last = this.pipes[this.pipes.length - 1];

    let x_min = -Pipe.WIDTH;

    if (first.x < x_min) {
      this.pipes.shift();
      let y_position = 0;
      let screen_height = this.env.height - this.floor.rect.height;

      this.pipes.push(
        new Pipe(
          this.asset,
          last.x + Pipe.WIDTH + Pipe.DISTANCE_BEETWEN,
          y_position,
          screen_height,
          score.value
        )
      );
    }
  }

  render(ctx: CanvasRenderingContext2D) {
    this.pipes.forEach((pipe) => pipe.render(ctx));
  }
}

function beetwen(r1: number, v: number, r2: number) {
  return r1 < v && v < r2;
}
