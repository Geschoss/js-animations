import { Module } from '../../common/module';

let pt_1 = { x: 100, y: 100 };
let pt_2 = { x: 200, y: 200 };
let c_1 = { x: 350, y: 150, r: 0 };
let c_2 = { x: 350, y: 150, r: 50 };

export const gradientModule: Module = {
  settings: {
    name: 'gradient',
  },
  init() {},
  render(ctx) {
    let gradient = ctx.createLinearGradient(pt_1.x, pt_1.y, pt_2.x, pt_2.y);
    gradient.addColorStop(0, '#ffffff');
    gradient.addColorStop(0.5, '#0000ff');
    gradient.addColorStop(1, '#ff0000');
    ctx.fillStyle = gradient;
    ctx.fillRect(100, 100, 200, 200);

    let grad_2 = ctx.createRadialGradient(
      c_1.x,
      c_1.y,
      c_1.r,
      c_2.x,
      c_2.y,
      c_2.r
    );

      //all black alpha blend
      grad_2.addColorStop(0, "#000000");
      grad_2.addColorStop(1, "rgba(0, 0, 0, 0)"); //alpha required

      ctx.fillStyle = grad_2;
      ctx.fillRect(300, 100, 100, 100);
  },
  destroy() {},
};
