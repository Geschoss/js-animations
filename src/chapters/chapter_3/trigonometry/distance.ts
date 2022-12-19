import { Mouse } from '../../../common/io';
import { Module } from '../../../common/module';

let rect_1 = {
  x: 0,
  y: 0,
};
let rect_2 = {
  x: 0,
  y: 0,
};
let mouse: Mouse;
export const distanceModule: Module = {
  settings: {
    name: 'distance',
  },
  init(ctx, env) {
    mouse = new Mouse(ctx);
    rect_1.x = Math.random() * env.width;
    rect_1.y = Math.random() * env.height;
    rect_2.x = Math.random() * env.width;
    rect_2.y = Math.random() * env.height;
  },
  render(ctx) {
    ctx.fillStyle = '#000000';
    ctx.fillRect(rect_1.x - 2, rect_1.y - 2, 4, 4);

    ctx.fillStyle = '#ff0000';
    ctx.fillRect(rect_2.x - 2, rect_2.y - 2, 4, 4);

    ctx.font = '30px Arial';
    ctx.fillText(`points distance: ${calculateDistance(rect_1, rect_2)}`, 10, 100);
    ctx.fillText(`mouse distance: ${calculateDistance(mouse, rect_2)}`, 10, 130);

    // draw line
    ctx.beginPath();
    ctx.moveTo(rect_2.x, rect_2.y);
    ctx.lineTo(mouse.x, mouse.y);
    ctx.closePath();
    ctx.stroke();
  },
  destroy() {
    mouse.destroy()
  },
};

type Point = {
  x: number;
  y: number;
};
function calculateDistance(point_1: Point, point_2: Point) {
  let dx = point_1.x - point_2.x;
  let dy = point_1.y - point_2.y;
  return Math.sqrt(dx * dx + dy * dy).toFixed(2);
}
