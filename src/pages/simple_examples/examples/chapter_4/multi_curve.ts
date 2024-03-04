import { Engine2D, Env } from 'src/entities/engine/2d/engine';
import { initByCb } from 'src/shared/lib';

export class MultiCurves {
  static id = 'MultiCurves';

  pencil: Pencil;
  game2D: Engine2D;

  constructor() {
    this.game2D = new Engine2D();
    const env = this.game2D.env;
    this.pencil = new Pencil(env);

    this.game2D.tick(({ context }) => {
      this.pencil.draw(context.ctx);
    });
  }

  destroy() {
    this.game2D.destroy();

    this.game2D = undefined;
    this.pencil = undefined;
  }
}

type Point = {
  x: number;
  y: number;
};

class Pencil {
  count = 10;
  points: Point[] = [];
  ctrlPoint = {};

  constructor(env: Env) {
    this.points = initByCb(this.count, () => ({
      x: Math.random() * env.width,
      y: Math.random() * env.height,
    }));
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.strokeStyle = '#ff0000';
    ctx.lineWidth = 5;
    ctx.lineCap = 'butt'; // how the end point of each line
    ctx.lineJoin = 'round';
    ctx.miterLimit = 10;
    let dx = (this.points[0].x + this.points[this.count - 1].x) / 2;
    let dy = (this.points[0].y + this.points[this.count - 1].y) / 2;
    ctx.moveTo(dx, dy);
    let i;
    for (i = 1; i < this.points.length - 2; i++) {
      let dx = (this.points[i].x + this.points[i + 1].x) / 2;
      let dy = (this.points[i].y + this.points[i + 1].y) / 2;
      ctx.quadraticCurveTo(this.points[i].x, this.points[i].y, dx, dy);
    }
    ctx.quadraticCurveTo(this.points[i].x, this.points[i].y, dx, dy);
    ctx.stroke();

    ctx.beginPath();
    ctx.strokeStyle = '#0000ff';
    ctx.lineWidth = 3;
    ctx.arc(100, 200, 40, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.stroke();

    // Arc
    ctx.beginPath();
    ctx.strokeStyle = '#00ff44';
    ctx.lineWidth = 5;
    ctx.moveTo(200, 200);
    ctx.arcTo(200, 50, 150, 200, 20);
    ctx.stroke();
  }
}
