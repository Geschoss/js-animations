import { Mouse } from '../../common/io';
import { MouseInjector } from '../../common/io/mouse';
import { Module } from '../../common/module';
import { isNil } from '../../lib';

let pencil: Pencil;
export const lineModule: Module = {
  settings: {
    name: 'line',
    injectors: [MouseInjector],
  },
  init(_, env) {
    pencil = new Pencil(env.injectors.mouse);
  },
  render(ctx) {
    pencil.draw(ctx);
    return cleanup;
  },
  destroy() {},
};
function cleanup() {}

class Pencil {
  mouse: Mouse;
  prevPos: { x: number; y: number };
  constructor(mouse: Mouse) {
    this.mouse = mouse;
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (isNil(this.prevPos) && this.mouse.leftButtonDown) {
      ctx.strokeStyle = '#ff0000';
      ctx.lineWidth = 2;
      ctx.lineCap = 'butt'; // how the end point of each line
      ctx.lineJoin = 'miter';
      ctx.miterLimit = 10;
      ctx.beginPath();
      ctx.moveTo(this.mouse.x, this.mouse.y);
      this.prevPos = this.mouse.copyPos();
    } else if (!isNil(this.prevPos) && this.mouse.leftButtonDown) {
      ctx.lineTo(this.mouse.x, this.mouse.y);
      this.prevPos = this.mouse.copyPos();
      ctx.stroke();
    } else if (!isNil(this.prevPos) && !this.mouse.leftButtonDown) {
      this.prevPos = null;
    }
  }
}
