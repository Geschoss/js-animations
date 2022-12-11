import { Ball } from './ball';
import { Mouse } from './mouse';
import { Module } from '../../common/module';

let mouse;
let balls;
let player;

export const ballsModule: Module = {
  settings: {
    name: 'balls',
  },
  init: (canvas: HTMLCanvasElement) => {
    mouse = new Mouse(canvas);
    balls = makeBalls(1000);
    player = new Ball(100, 100, 40, '#eebe0a');
  },
  render: (ctx) => {
    player.set(mouse.x, mouse.y);
    player.render(ctx);
    balls.forEach((ball) => {
      ball.think(player);
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
    balls.push(
      new Ball(
        100 + Math.random() * 500,
        100 + Math.random() * 400,
        2,
        '#00bcd4'
      )
    );
  }
  return balls;
}
