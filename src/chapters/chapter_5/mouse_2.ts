import { Keyboard, KeyboardInjector } from '../../common/io/keyboard';
import { Mouse, MouseInjector } from '../../common/io/mouse';
import { Module } from '../../common/module';
import { Arraw } from './arraw';

let mouse: Mouse;
let arraw: Arraw;
let force = 0.05;
let vx = 0;
let vy = 0;
export const mouse_1Module: Module = {
  settings: {
    name: 'mouse_1',
    injectors: [MouseInjector, KeyboardInjector],
  },
  init(_, env) {
    arraw = new Arraw(env.width / 2, env.height / 2);
    force = 0.05;
    mouse = env.injectors.mouse;
  },
  render(ctx) {
    let dx = mouse.x - arraw.x;
    let dy = mouse.y - arraw.y;
    let angle = Math.atan2(dy, dx);
    let ax = Math.cos(angle) * force;
    let ay = Math.sin(angle) * force;
    arraw.rotation = angle;
    vx += ax;
    vy += ay;
    arraw.x += vx;
    arraw.y += vy;
    arraw.draw(ctx);
  },
  destroy() {},
};
