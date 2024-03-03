import { Engine2D, Env } from 'src/entities/engine/2d/engine';
import { initByCb } from 'src/shared/lib';

export class Shapes {
  static id = 'Shapes';

  pencil: Pencil;
  game2D: Engine2D;

  constructor() {
    this.game2D = new Engine2D();
    const env = this.game2D.env;
    this.pencil = new Pencil(env);

    this.game2D.tick((ctx) => {
      this.pencil.draw(ctx);
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
    ctx.fillStyle = '#ff0000';
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
    ctx.fill();

    // Arc
    ctx.beginPath();
    ctx.fillStyle = '#00ff44';
    ctx.moveTo(100, 100);
    ctx.arcTo(200, 50, 150, 200, 20);
    ctx.fill();
  }
}
