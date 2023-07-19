import { Mouse, MouseInjector } from '../../common/io/mouse';
import { Env, Module } from '../../common/module';
import { range } from '../../lib';

let pencil: Pencil;
export const shapesModule: Module = {
  settings: {
    name: 'shapes',
    injectors: [MouseInjector],
  },
  init(_, env) {
    pencil = new Pencil(env.injectors.mouse, env);
  },
  render(ctx) {
    pencil.draw(ctx);
  },
  destroy() {},
};
type Point = {
  x: number;
  y: number;
};

class Pencil {
  count = 10;
  mouse: Mouse;
  points: Point[] = [];
  ctrlPoint = {};
  constructor(mouse: Mouse, env: Env) {
    this.mouse = mouse;
    this.points = range(this.count, () => ({
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
