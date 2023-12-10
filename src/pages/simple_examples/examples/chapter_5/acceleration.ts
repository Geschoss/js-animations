import { Engine2D } from 'src/entities/engine/2d/engine';

export class Acceleration {
  static id = 'acceleration';
  game2D: Engine2D;

  constructor() {
    this.game2D = new Engine2D();

    const env = this.game2D.env;
    let arraw = new Arraw(env.width / 2, env.height / 2);
    let speed = 0;

    this.game2D.tick((ctx, _, keyboard) => {
      if (keyboard.pressed('ArrowLeft')) {
        arraw.rotation -= (2 * Math.PI) / 180;
      }
      if (keyboard.pressed('ArrowRight')) {
        arraw.rotation += (2 * Math.PI) / 180;
      }
      if (keyboard.pressed('ArrowUp')) {
        if (speed < 4) {
          speed += 0.2;
        }
      }
      if (keyboard.pressed('ArrowDown')) {
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
    });
  }
  destroy() {
    this.game2D.destroy();

    this.game2D = undefined;
  }
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
