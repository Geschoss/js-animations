import { Module } from '../../../common/module';
import { Mouse } from '../../../common/io/mouse';
// move
import { Ball } from '../../chapter_2/ball/ball';
import { Keyboard } from '../../../common/io';

let mouse: Mouse;
let arrow: Arraw;
let player: Ball;
let keyboard: Keyboard;
export const arrowModule: Module = {
  settings: {
    name: 'arrow',
  },
  init(canvas) {
    arrow = new Arraw(150, 150);
    mouse = new Mouse(canvas);
    player = new Ball(100, 100, 20, '#eebe0a');
    keyboard = new Keyboard();
  },
  render(ctx) {
    player.set(mouse.x, mouse.y);
    player.render(ctx);

    arrow.ratateTo(mouse);
    arrow.draw(ctx);
  },
  destroy() {
    keyboard.destroy();
    mouse.destroy();
  },
};

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
