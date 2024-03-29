import { Engine2D, Env } from 'src/entities/engine/2d/engine';
import { TouchTap } from 'src/entities/engine/io/touch';

import { Ball } from './ball';

export class BallTouch {
  static id = 'BallTouch';

  balls: Ball[];
  player: Ball;
  game2D: Engine2D;

  constructor() {
    this.game2D = new Engine2D({ controller: TouchTap });
    const env = this.game2D.env;

    this.balls = makeBalls(2000, env);
    this.player = new Ball(env.width / 2, env.height / 2, 30, '#eebe0a');

    let physics = {
      friction: friction(0.99),
      spring: spring(0.0),
    };
    this.game2D.tick(({ context, controller }) => {
      if (controller.pressed) {
        this.player.set(controller.x, controller.y);
      }
      this.player.render(context.ctx);
      this.balls.forEach((ball) => {
        ball.think(this.player, physics);
        ball.render(context.ctx);
      });
    });
  }

  destroy() {
    this.game2D.destroy();

    this.balls = undefined;
    this.game2D = undefined;
    this.player = undefined;
  }
}

function makeBalls(count: number, env: Env) {
  let balls = [];
  let pad_x = env.width / 20;
  let pad_y = env.height / 20;
  for (let i = 0; i < count; i++) {
    let x = pad_x + Math.random() * (env.width - pad_x * 2);
    let y = pad_y + Math.random() * (env.height - pad_y * 2);
    balls.push(new Ball(x, y, 2, '#00bcd4'));
  }
  return balls;
}

function spring(factor) {
  return {
    vx(x_1, x_2) {
      let dxs = -(x_1 - x_2);
      return dxs * factor;
    },
    vy(y_1, y_2) {
      let dys = -(y_1 - y_2);
      return dys * factor;
    },
  };
}

function friction(factor) {
  return {
    vx() {
      return factor;
    },
    vy() {
      return factor;
    },
  };
}
