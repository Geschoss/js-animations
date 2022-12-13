import { Ball } from './ball';
import { Mouse } from './mouse';
import { Module } from '../../common/module';

let mouse;
let balls;
let player;

let env = {
  friction: friction(0.5),
  spring: spring(0.01),
}

export const ballsModule: Module = {
  settings: {
    name: 'balls',
  },
  init: (canvas: HTMLCanvasElement) => {
    mouse = new Mouse(canvas);
    balls = makeBalls(2000);
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

function makeBalls(count: number) {
  let balls = [];
  for (let i = 0; i < count; i++) {
    let x = 100 + Math.random() * 500;
    let y = 100 + Math.random() * 400;
    balls.push(
      new Ball(
        x,
        y,
        2,
        '#ff0000' 
      )
    );
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
    }
  } 
}

function friction(factor) {
  return {
    vx(x_1, x_2) {
      return factor; 
    },
    vy(y_1, y_2) {
      return factor; 
    }
  } 
}