import { Module } from '../../../common/module';
import { Ball } from './ball';

let ball: Ball;
let ball_oval: Ball;
let angle = 0;
let centerX = 0;
let centerY = 0;
let radius = 100;
let speed = 0.02;
export const circleModule: Module = {
  settings: {
    name: 'circle',
  },
  init(_, env) {
    ball = new Ball(200, 200, 40, '#11bbff');
    ball_oval = new Ball(200, 200, 20, '#00ffff');
    centerX = env.width / 2;
    centerY = env.height / 2;
  },
  render(ctx) {
    angle += speed;
    ball.x = centerX + Math.sin(angle) * radius;
    ball.y = centerY + Math.cos(angle) * radius;

    ball_oval.x = ball.x + Math.sin(angle*2) * 100;
    ball_oval.y = ball.y + Math.cos(angle*2) * 40;

    let dy = ball.y - ball_oval.y;

    if (dy > 0) {
        ball_oval.render(ctx);
        ball.render(ctx);
    } else {
        ball.render(ctx);
        ball_oval.render(ctx);
    }
  },
  destroy() {},
};
