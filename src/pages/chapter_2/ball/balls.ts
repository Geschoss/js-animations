import { Ball } from './ball';
import { Mouse } from '../../../common/io';
import { Env, Module } from '../../../common/module';

let mouse;
let balls;
let player;

let env = {
  friction: friction(0.5),
  spring: spring(0.01),
};

export const ballsModule: Module = {
  settings: {
    name: 'balls',
  },
  init: (canvas, env) => {
    mouse = new Mouse(canvas);
    balls = makeBalls(5000, env);
    player = new Ball(100, 100, 20, '#eebe0a');
  },
  render: (ctx) => {
    player.set(mouse.x, mouse.y);
    player.render(ctx);
    balls.forEach((ball) => {
      ball.think(player, env);
      ball.render(ctx);
    });
  },
  destroy() {
    mouse.destroy();
    mouse = undefined;
    balls = undefined;
    player = undefined;
  },
};

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
