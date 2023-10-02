import { Expand } from '@/entities/engine/2d/behaviors';
import { Ball, Rect } from '../../../entities/engine/2d/entities';
import { range } from '../../../shared/lib';
import { Engine2D } from '@/entities/engine/2d/engine';

const BALLS_COUNT = 50;
const BALL_RADIUS = 10;

export class Removal {
  static name = 'Removal';

  game2D: Engine2D;

  rect: Rect;
  balls: Ball[] = [];

  constructor() {
    this.game2D = new Engine2D();
    const env = this.game2D.env;

    this.rect = createRect(env);
    this.balls = createBalls(this.rect);

    this.game2D.tick((ctx) => {
      this.balls = removeBalls(this.balls, this.rect);
      this.balls.forEach((ball) => {
        ball.think();
        ball.render(ctx);
      });
      this.rect.render(ctx);
    });
  }

  destroy() {
    this.game2D.destroy();

    this.game2D = undefined;
    this.rect = undefined;
    this.balls = [];
  }
}

function removeBalls(balls: Ball[], rect: Rect) {
  return balls.filter((ball) => {
    return !(
      ball.x - ball.radius > rect.right ||
      ball.x + ball.radius < rect.x ||
      ball.y - ball.radius > rect.bottom ||
      ball.y + ball.radius < rect.y
    );
  });
}

function createRect(env) {
  return new Rect(100, 100, env.width - 200, env.height - 200, '#00ff00');
}

function createBalls(rect: Rect) {
  return range(
    BALLS_COUNT,
    () =>
      new Ball(
        BALL_RADIUS + rect.x + Math.random() * (rect.right - 2 * BALL_RADIUS),
        BALL_RADIUS + rect.y + Math.random() * (rect.bottom - 2 * BALL_RADIUS),
        BALL_RADIUS,
        '#ff6600',
        new Expand<Ball>(Math.random() * 2 - 1, Math.random() * 2 - 1)
      )
  );
}
