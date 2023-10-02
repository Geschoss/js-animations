import { Ball } from './ball';
import { Engine2D, Env } from '@/entities/engine/2d/engine';

export class Balls2 {
  static id = 'Balls2';

  balls: Ball[];
  player: Ball;
  game2D: Engine2D;

  constructor() {
    this.game2D = new Engine2D();
    this.balls = makeBalls(5000, this.game2D.env);
    this.player = new Ball(100, 100, 20, '#eebe0a');

    let physics = {
      friction: friction(),
      spring: spring(),
    };

    this.game2D.tick((ctx, mouse) => {
      this.player.set(mouse.x, mouse.y);
      this.player.render(ctx);
      this.balls.forEach((ball) => {
        ball.think(this.player, { ...this.game2D.env, ...physics });
        ball.render(ctx);
      });
    });
  }

  destroy() {
    this.game2D.destroy();

    this.game2D = undefined;
    this.balls = undefined;
    this.player = undefined;
  }
}

function makeBalls(count: number, env: Env) {
  let balls = [];
  let pad_x = env.width / 10;
  let pad_y = env.height / 10;
  for (let i = 0; i < count; i++) {
    let x = pad_x + Math.random() * (env.width - pad_x * 2);
    let y = pad_y + Math.random() * (env.height - pad_y * 2);
    balls.push(
      new Ball(
        x,
        y,
        x > env.width / 2 ? 2 : 3,
        x > env.width / 2 ? '#00bcd4' : '#bdb76b'
      )
    );
  }
  return balls;
}

function spring() {
  let f_1 = 0.0;
  let f_2 = 0.0;
  return {
    vx(x_1, x_2, env: Env) {
      let factor = x_2 > env.width / 2 ? f_1 : f_2;
      let dxs = -(x_1 - x_2);
      return dxs * factor;
    },
    vy(y_1, y_2, env: Env) {
      let factor = y_2 > env.width / 2 ? f_1 : f_2;
      let dys = -(y_1 - y_2);
      return dys * factor;
    },
  };
}

function friction() {
  let f_1 = 0.99;
  let f_2 = 0.4;
  return {
    vx(_, x_2, env: Env) {
      let factor = x_2 > env.width / 2 ? f_1 : f_2;
      return factor;
    },
    vy(_, y_2, env: Env) {
      let factor = y_2 > env.width / 2 ? f_1 : f_2;
      return factor;
    },
  };
}
