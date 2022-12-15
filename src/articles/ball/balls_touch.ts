import { Ball } from './ball';
import { Touch } from '../../common/io';
import { Env, Module } from '../../common/module';

let balls: Ball[];
let player: Ball;
let touch: Touch;

let env = {
  friction: friction(0.99),
  spring: spring(0.0),
};

export const ballsTouchModule: Module = {
  settings: {
    name: 'balls_touch',
  },
  init: (canvas, _env) => {    
    touch = new Touch(canvas);
    balls = makeBalls(2000, _env);
    player = new Ball(_env.width/2, _env.height/2, 30, '#eebe0a');
  },
  render: (ctx) => {
    if (touch.pressed) {
      player.set(touch.x, touch.y);
    }
    player.render(ctx);
    balls.forEach((ball) => {
      ball.think(player, env);
      ball.render(ctx);
    });
  },
  destroy() {
    touch.destroy();
    touch = undefined;
    balls = undefined;
    player = undefined;
  },
};

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
