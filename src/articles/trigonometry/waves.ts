import { Module } from '../../common/module';
import { Ball } from './ball';

let ball_1: Ball;
let ball_2: Ball;
let ball_3: Ball;
let ball_4: Ball;
let ball_5: Ball;
let radius = 40;
let angle = 0;

export const wavesModule: Module = {
  settings: {
    name: 'waves',
  },
  init(_, env) {
    ball_1 = new Ball(env.width / 2, env.height / 2, radius, '#ffee00');
    ball_2 = new Ball(env.width / 2, env.height / 2, radius, '#00ff00');
    ball_3 = new Ball(env.width / 2, env.height / 2, radius, '#0000ff');
    ball_4 = new Ball(env.width / 2, env.height / 2, radius, '#f0f0f0');
    ball_5 = new Ball(env.width / 2, env.height / 2, radius);
  },
  render(ctx, env) {
    angle += 0.03;
    let half_x = env.width / 2;
    let half_y = env.height / 2;
    ball_1.x = half_x + Math.sin(angle * 0.2) * (half_x - radius);

    ball_2.y = half_y + Math.sin(angle * 0.3) * (half_y - radius);

    ball_3.y = half_y + Math.sin(angle * 0.4) * (half_y - radius);
    ball_3.x = half_x + Math.sin(angle) * (half_x - radius);

    ball_4.y = half_y + Math.sin(angle * 0.5) * (half_y - radius);
    ball_4.x = half_x + Math.cos(angle * 0.2) * (half_x -radius);

    ball_5.x = half_x + Math.sin(angle * 2) * (half_x - radius);

    ball_1.render(ctx);
    ball_2.render(ctx);
    ball_3.render(ctx);
    ball_4.render(ctx);
    ball_5.render(ctx);
  },
  destroy() {},
};

