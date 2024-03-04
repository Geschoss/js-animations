import { Engine2D, Env } from 'src/entities/engine/2d/engine';
import { Controller } from 'src/entities/engine/io/types';
import { initByCb } from 'src/shared/lib';

export class Curves {
  static id = 'Curves';

  pencil: Pencil;
  game2D: Engine2D;

  constructor() {
    this.game2D = new Engine2D();
    const env = this.game2D.env;
    this.pencil = new Pencil(env);

    this.game2D.tick(({ context, controller }) => {
      this.pencil.draw(context.ctx, controller);
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
  points: Point[] = [];
  point = {
    x0: 0,
    y0: 0,
    x1: 0,
    y1: 0,
  };

  constructor(env: Env) {
    this.points = initByCb(20, () => ({
      x: Math.random() * env.width,
      y: Math.random() * env.height,
    }));
    this.point = {
      x0: Math.random() * env.width,
      y0: Math.random() * env.height,
      x1: Math.random() * env.width,
      y1: Math.random() * env.height,
    };
  }

  draw(ctx: CanvasRenderingContext2D, mouse: Controller) {
    ctx.beginPath();
    ctx.strokeStyle = '#00ff00';
    ctx.lineWidth = 10;
    ctx.lineCap = 'butt';

    ctx.lineJoin = 'round';
    ctx.miterLimit = 20;
    ctx.moveTo(this.point.x0, this.point.y0);
    ctx.quadraticCurveTo(mouse.x, mouse.y, this.point.x1, this.point.y1);
    ctx.stroke();

    ctx.beginPath();
    ctx.strokeStyle = '#ff0000';
    ctx.lineWidth = 5;
    ctx.lineCap = 'butt'; // how the end point of each line
    ctx.lineJoin = 'round';
    ctx.miterLimit = 10;
    ctx.moveTo(this.points[0].x, this.points[0].y);
    for (let i = 1; i < this.points.length - 1; i += 2) {
      ctx.quadraticCurveTo(
        this.points[i].x,
        this.points[i].y,
        this.points[i + 1].x,
        this.points[i + 1].y
      );
    }
    ctx.stroke();
  }
}
