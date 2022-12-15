import { Ball } from './ball';
import { Mouse } from '../../common/io';
import { Env, Module } from '../../common/module';

let mouse;
let balls;
let player;

let env = {
  friction: friction(),
  spring: spring(),
}

export const balls_2Module: Module = {
  settings: {
    name: 'balls_2',
  },
  init: (canvas, _env) => {
    mouse = new Mouse(canvas);
    balls = makeBalls(2000, _env);
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
    vx(x_1, x_2) {
      let factor = x_2 > 350 ? f_1 : f_2;
      let dxs = -(x_1 - x_2);
      return dxs * factor; 
    },
    vy(y_1, y_2) {
      let factor = y_2 > 350 ? f_1 : f_2;
      let dys = -(y_1 - y_2);
      return dys * factor; 
    }
  } 
}

function friction() {
  let f_1 = 0.99;
  let f_2 = 0.4;
  return {
    vx(_, x_2) {
      let factor = x_2 > 350 ? f_1 : f_2;
      return factor; 
    },
    vy(_, y_2) {
      let factor = y_2 > 350 ? f_1 : f_2;
      return factor; 
    }
  } 
}