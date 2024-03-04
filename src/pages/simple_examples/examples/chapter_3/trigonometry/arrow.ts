import { Engine2D } from 'src/entities/engine/2d/engine';

import { Ball } from '../../chapter_2/ball/ball';

export class Arrow {
  static id = 'Arrow';

  game2D: Engine2D;

  constructor() {
    this.game2D = new Engine2D();

    let arrow = new Arraw(150, 150);
    let player = new Ball(100, 100, 20, '#eebe0a');

    this.game2D.tick(({ context, controller }) => {
      player.set(controller.x, controller.y);
      player.render(context.ctx);

      arrow.ratateTo(controller);
      arrow.draw(context.ctx);
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
