import { Expand } from '../../common/behaviors';
import { Context2D } from '../../entities/engine/2d/context';
import { Ball, Rect } from '../../common/entities';
import { Module } from '../../common/module';
import { range } from '../../shared/lib';

const BALLS_COUNT = 50;
const BALL_RADIUS = 10;
let rect: Rect;
let balls: Ball[] = [];
let context2d: Context2D;

export const removalModule: Module = {
  settings: {
    name: 'removal',
  },

  init(_, env) {
    context2d = new Context2D(720, 720);
    rect = createRect(env);
    balls = createBalls(rect);
  },

  render(_) {
    context2d.clean();
    balls = removeBalls(balls, rect);
    // balls = addBalls(balls, rect);
    balls.forEach((ball) => {
      ball.think();
      ball.render(context2d.ctx);
    });
    rect.render(context2d.ctx);
  },

  destroy() {
    context2d.destroy();
  },

  resize(_, env) {
    rect = createRect(env);
    balls = createBalls(rect);
  },
};

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

// function addBalls(balls: Ball[], rect: Rect) {
//   let count = BALLS_COUNT - balls.length;
//   let new_balls = range(count, () => {
//     return new Ball(
//       BALL_RADIUS + rect.x + Math.random() * (rect.right - 2 * BALL_RADIUS),
//       rect.y - 2 * BALL_RADIUS,
//       BALL_RADIUS,
//       '#ff6600',
//       new Expand<Ball>(Math.random() * 2 - 1, Math.random() * 2 - 1)
//     );
//   });

//   return [...new_balls, ...balls];
// }

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
