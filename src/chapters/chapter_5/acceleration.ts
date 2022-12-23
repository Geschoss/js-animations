import { Keyboard, KeyboardInjector, Keys } from '../../common/io/keyboard';
import { Mouse, MouseInjector } from '../../common/io/mouse';
import { Module } from '../../common/module';

let mouse: Mouse;
let keyboard: Keyboard;
let arraw: Arraw;
let speed = 0;
export const accelerationModule: Module = {
  settings: {
    name: 'acceleration',
    injectors: [MouseInjector, KeyboardInjector],
  },
  init(_, env) {
    arraw = new Arraw(env.width / 2, env.height / 2);
    speed = 0;
    mouse = env.injectors.mouse;
    keyboard = env.injectors.keyboard;
  },
  render(ctx) {
    if (keyboard.pressed(Keys.ArrowLeft)) {
      arraw.rotation -= (2 * Math.PI) / 180;
    }
    if (keyboard.pressed(Keys.ArrowRight)) {
      arraw.rotation += (2 * Math.PI) / 180;
    }
    if (keyboard.pressed(Keys.ArrowUp)) {
      if (speed < 4) {
        speed += 0.2;
      }
    }
    if (keyboard.pressed(Keys.ArrowDown)) {
      speed -= 0.2;
    }
    if (speed < 0) {
      speed = 0;
    } else {
      speed -= 0.05;
    }
    let vx = Math.cos(arraw.rotation) * speed;
    let vy = Math.sin(arraw.rotation) * speed;
    arraw.x += vx;
    arraw.y += vy;
    arraw.draw(ctx);

    // drawVector(ctx, arraw);
  },
  destroy() {},
};

function drawVector(ctx: CanvasRenderingContext2D, arraw: Arraw) {
  let dx = 100 * Math.cos(arraw.rotation);
  let dy = 100 * Math.sin(arraw.rotation);
  ctx.beginPath();
  ctx.strokeStyle = '#ff0000';
  ctx.lineWidth = 3;
  ctx.moveTo(arraw.x, arraw.y);
  ctx.lineTo(arraw.x + dx, arraw.y + dy);
  ctx.closePath();
  ctx.stroke();
}

class Arraw {
  x: number;
  y: number;
  color = '';
  rotation = 0;

  constructor(x = 0, y = 0, color = '#ffff00') {
    this.x = x;
    this.y = y;
    this.color = color;
    this.rotation = 0;
  }

  ratateTo({ x, y }: { x: number; y: number }) {
    let dx = x - this.x;
    let dy = y - this.y;
    this.rotation = Math.atan2(dy, dx);
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    ctx.lineWidth = 2;
    ctx.fillStyle = this.color;
    ctx.strokeStyle = '#000000';
    ctx.beginPath();
    ctx.moveTo(-50, -25);
    ctx.lineTo(0, -25);
    ctx.lineTo(0, -50);
    ctx.lineTo(50, 0);
    ctx.lineTo(0, 50);
    ctx.lineTo(0, 25);
    ctx.lineTo(-50, 25);
    ctx.lineTo(-50, -25);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }
}
