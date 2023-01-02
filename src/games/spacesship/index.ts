import { KeyboardInjector } from '../../common/io/keyboard';
import { Env, Module } from '../../common/module';
import { Space } from './acceleration';
import { Ship } from './ship';
import { Bullet, MachineGun, RocketLaucher } from './weapons';

type World = {
  weapons?: [];
  enemies: any[];
  bullets: Bullet[];
};
let world: World = {
  enemies: [],
  bullets: [],
};
let ship: Ship;
export const spacesshipGame: Module = {
  settings: {
    name: 'Spacesship',
    injectors: [KeyboardInjector],
  },
  init(_, env) {
    let keyboard = env.injectors.keyboard;
    let acceleration = new Space();
    ship = new Ship(
      keyboard,
      acceleration,
      env.width / 2,
      env.height / 2,
      new MachineGun()
    );
  },
  render(ctx, env) {
    world.enemies.forEach((enemy) => {
      enemy.think(world);
      enemy.render(ctx);
    });
    world.bullets.forEach((bullet) => {
      bullet.think(world);
      bullet.render(ctx);
    });
    ship.think(world);
    ship.render(ctx);

    clearWorld(world, env);
  },
  destroy() {
    ship = undefined;
  },
};
function clearWorld(world, env: Env) {
  world.bullets = world.bullets.filter(
    (bullet) =>
      inRange(0, env.width, bullet.x) && inRange(0, env.height, bullet.y)
  );
}

function inRange(s: number, e: number, v: number) {
  return v > s && v < e;
}
