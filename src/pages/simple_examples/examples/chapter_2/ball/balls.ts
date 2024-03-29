import { Engine2D, Env } from 'src/entities/engine/2d/engine';
import { Ball } from 'src/pages/simple_examples/examples/chapter_2/ball/ball';

export class Balls {
  static id = 'Balls';

  balls: Ball[];
  player: Ball;
  game2D: Engine2D;

  constructor() {
    this.game2D = new Engine2D();
    this.balls = makeBalls(5000, this.game2D.env);
    this.player = new Ball(100, 100, 20, '#eebe0a');

    let physics = {
      friction: friction(0.5),
      spring: spring(0.01),
    };

    this.game2D.tick(({ context, controller }) => {
      this.player.set(controller.x, controller.y);
      this.player.render(context.ctx);
      this.balls.forEach((ball) => {
        ball.think(this.player, physics);
        ball.render(context.ctx);
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
    balls.push(new Ball(x, y, 2, '#ff0000'));
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
