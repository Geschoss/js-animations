import { LinearMove } from 'src/entities/engine/2d/behaviors';
import { Engine2D, Env } from 'src/entities/engine/2d/engine';
import { Ball, Rect } from 'src/entities/engine/2d/entities';
import { View } from 'src/entities/engine/2d/view';
import { initByCb, r_range } from 'src/shared/lib';

export class Bundaries {
  static id = 'Boundaries';

  game2D?: Engine2D;

  balls: Ball[];
  screen: Rect;

  constructor() {
    this.game2D = new Engine2D();

    this.screen = createScreen(this.game2D.env);

    const BALL_RADIUS = 10;
    const BALL_COUNT = 30;
    const BALL_MAX_SPEED = 3;
    const BALL_FRICTION = 0.9;

    this.balls = initByCb(
      BALL_COUNT,
      () =>
        new Ball(
          r_range(BALL_RADIUS + this.screen.x, this.screen.right - BALL_RADIUS),
          r_range(
            BALL_RADIUS + this.screen.y,
            this.screen.bottom - BALL_RADIUS
          ),
          BALL_RADIUS,
          '#ff6600',
          new LinearMove<Ball>(
            r_range(-BALL_MAX_SPEED, BALL_MAX_SPEED),
            r_range(-BALL_MAX_SPEED, BALL_MAX_SPEED)
          ),
          new BallViewWithLine(),
        )
    );

    this.game2D.tick(({ context }) => {
      this.screen?.render(context.ctx);
      this.balls.forEach((ball) => {
        if (is_leaf_x(ball, this.screen)) {
          ball.behavior.dx = -BALL_FRICTION * ball.behavior.dx;
          ball.behavior.dy = BALL_FRICTION * ball.behavior.dy;
        }
        if (is_leaf_y(ball, this.screen)) {
          ball.behavior.dx = BALL_FRICTION * ball.behavior.dx;
          ball.behavior.dy = -BALL_FRICTION * ball.behavior.dy;
        }
        ball.think();
        ball.render(context.ctx);
      });
    });

    this.game2D.onResize(() => {
      if (this.game2D) {
        this.screen = createScreen(this.game2D.env);
      }
    });
  }

  destroy() {
    this.game2D?.destroy();
    this.game2D = undefined;

    this.balls = undefined;
    this.screen = undefined;
  }
}

function createScreen(env: Env) {
  let w_padding = (env.width * 5) / 100;
  let h_padding = (env.height * 20) / 100;
  return new Rect(
    w_padding,
    h_padding,
    env.width - 2 * w_padding,
    env.height - 2 * h_padding,
    '#00ffff'
  );
}

function is_leaf_x(ball: Ball, screen: Rect) {
  if (screen.x > ball.x - ball.radius && ball.behavior.dx < 0) {
    return true;
  }
  if (screen.right < ball.x + ball.radius && ball.behavior.dx > 0) {
    return true;
  }
  return false;
}
function is_leaf_y(ball: Ball, screen: Rect) {
  if (screen.y > ball.y - ball.radius && ball.behavior.dy < 0) {
    return true;
  }
  if (screen.bottom < ball.y + ball.radius && ball.behavior.dy > 0) {
    return true;
  }
  return false;
}

export class BallViewWithLine implements View<Ball> {
  render(ctx: CanvasRenderingContext2D, { x, y, radius, color, behavior }: Ball) {
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
