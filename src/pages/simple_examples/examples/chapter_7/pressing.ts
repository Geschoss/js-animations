import { None } from 'src/entities/engine/2d/behaviors';
import { Engine2D } from 'src/entities/engine/2d/engine';
import { Ball } from 'src/entities/engine/2d/entities';
import { View } from 'src/entities/engine/2d/view';
import { COLORS } from 'src/shared/lib';

export class Pressing {
  static id = 'Pressing';

  game2D?: Engine2D;

  ball: Ball;

  constructor() {
    this.game2D = new Engine2D();

    this.ball = new Ball(
      200,
      300,
      40,
      'ff6600',
      new None<Ball>(),
      new BallViewWithLine()
    );
    let dx = 0;
    let dy = 0;
    let hold = false;

    this.game2D.tick(({ context, controller }) => {
      this.ball.color = COLORS.warning;

      if (!controller.pressed) {
        dx = this.ball.x - controller.x;
        dy = this.ball.y - controller.y;
        hold = false;
      }

      if (this.ball.isInside(controller.x, controller.y)) {
        if (controller.pressed) {
          hold = true;
        }
        this.ball.color = COLORS.positive;
      }
      if (hold) {
        this.ball.color = COLORS.positive;
        this.ball.x = controller.x + dx;
        this.ball.y = controller.y + dy;
      }
      this.ball.think();
      this.ball.render(context.ctx);
    });
  }

  destroy() {
    this.game2D?.destroy();
    this.game2D = undefined;

    this.ball = undefined;
  }
}

class BallViewWithLine implements View<Ball> {
  render(
    ctx: CanvasRenderingContext2D,
    { x, y, radius, color, behavior }: Ball
  ) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
    ctx.restore();

    ctx.beginPath();
    ctx.strokeStyle = '#0000ff';
    ctx.moveTo(x, y);
    ctx.lineTo(x + behavior.dx * 100, y);
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, y + behavior.dy * 100);
    ctx.strokeStyle = '#f00fff';
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + behavior.dx * 100, y + behavior.dy * 100);
    ctx.strokeStyle = '#ff0000';
    ctx.closePath();
    ctx.stroke();
  }
}
