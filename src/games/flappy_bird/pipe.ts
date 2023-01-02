import { Behavior, LinearMove } from '../../common/behaviors/index';
import { Rect } from '../../common/entities/index';

export class Pipe {
  static GAP = 200;
  static WIDTH = 50;
  static MIN_HEIGHT = 10;
  static DISTANCE_BEETWEN = 220;
  static SPEED = -4;

  top: Rect;
  bottom: Rect;
  x: number;
  y: number;
  behavior: Behavior<Pipe>;

  constructor(x: number, y: number, height: number) {
    this.x = x;
    this.y = y;
    this.behavior = new LinearMove(Pipe.SPEED);

    this.top = Rect.create({
      x: x,
      y: y,
      width: Pipe.WIDTH,
      height:
        Pipe.MIN_HEIGHT +
        Math.random() * (height - (Pipe.GAP + Pipe.MIN_HEIGHT)),
    });
    this.bottom = Rect.create({
      x: this.top.x,
      y: this.top.bottom + Pipe.GAP,
      width: Pipe.WIDTH,
      height: height - this.top.height - Pipe.GAP,
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
  }
}
