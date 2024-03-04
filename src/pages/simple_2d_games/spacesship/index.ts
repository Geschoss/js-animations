import { Engine2D, Env } from 'src/entities/engine/2d/engine';

import { Space } from './acceleration';
import { Ship } from './ship';
import {
  DefaultShip,
  EF_50Ship,
  Ef_200Ship,
  Ex_100Ship,
  ShipView,
  T_50Ship,
} from './ships';
import { Bullet, MachineGun, PlasmaGun, RocketLaucher } from './weapons';

const SHIPS_VIEWS: ShipView[] = [
  EF_50Ship,
  T_50Ship,
  DefaultShip,
  Ex_100Ship,
  Ef_200Ship,
];
const WEAPONS = [MachineGun, RocketLaucher, PlasmaGun];
let current_weapon_view = 0;
let current_ship_view = 0;
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

export class SpacesShip {
  static id = 'spacesShip';

  game2D: Engine2D;

  constructor() {
    this.game2D = new Engine2D();
    const { env, keyboard } = this.game2D;
    let acceleration = new Space();
    let shipView = SHIPS_VIEWS[current_ship_view];
    ship = new Ship(
      keyboard,
      acceleration,
      env.width / 2,
      env.height / 2,
      WEAPONS[current_weapon_view],
      shipView
    );

    this.game2D.tick(({ context, keyboard }) => {
      if (keyboard.pressed('KeyL')) {
        changeShip(ship, SHIPS_VIEWS, 1);
      }
      if (keyboard.pressed('Semicolon')) {
        changeShip(ship, SHIPS_VIEWS, -1);
      }
      if (keyboard.pressed('KeyO')) {
        changeWeapon(ship, 1);
      }
      if (keyboard.pressed('KeyP')) {
        changeWeapon(ship, -1);
      }
      renderHelpText(context.ctx, env);
      renderShipName(context.ctx, env, ship);

      world.enemies.forEach((enemy) => {
        enemy.think(world);
        enemy.render(context.ctx);
      });
      world.bullets.forEach((bullet) => {
        bullet.think(world);
        bullet.render(context.ctx);
      });
      ship.think(world);
      ship.render(context.ctx);

      clearWorld(world, env);
    });
  }

  destroy() {
    this.game2D.destroy();

    this.game2D = undefined;
  }
}

function clearWorld(world, env: Env) {
  world.bullets = world.bullets.filter(
    (bullet) =>
      inRange(0, env.width, bullet.x) && inRange(0, env.height, bullet.y)
  );
}

function inRange(s: number, e: number, v: number) {
  return v > s && v < e;
}

function changeShip(ship: Ship, shipViews: any[], direction: number) {
  current_ship_view += direction;
  if (current_ship_view >= shipViews.length) {
    current_ship_view = 0;
  }
  if (current_ship_view < 0) {
    current_ship_view = shipViews.length - 1;
  }
  ship.changeChip(shipViews[current_ship_view]);
}

function changeWeapon(ship: Ship, direction: number) {
  current_weapon_view += direction;
  if (current_weapon_view >= WEAPONS.length) {
    current_weapon_view = 0;
  }
  if (current_weapon_view < 0) {
    current_weapon_view = WEAPONS.length - 1;
  }
  ship.cnahgeWeapon(WEAPONS[current_weapon_view]);
}

function renderHelpText(ctx: CanvasRenderingContext2D, env: Env) {
  ctx.save();
  ctx.fillStyle = '#ff0000';
  ctx.font = '20px Arial';
  ctx.fillText(`Смена корабля: Д или Ж`, 10, env.height - 10);
  ctx.fillText(`Смена оружия: Щ или З`, 10, env.height - 30);
  ctx.fillText(`Летать на стрелки`, 10, env.height - 50);

  ctx.restore();
}

function renderShipName(ctx: CanvasRenderingContext2D, env: Env, ship: Ship) {
  ctx.save();
  ctx.fillStyle = '#ff0000';
  ctx.font = '20px Arial';
  ctx.fillText(`корабль: ${ship.view.name}`, 10, env.height - 80);
  ctx.fillText(`оружие: ${ship.view.weapon_name}`, 10, env.height - 100);
  ctx.restore();
}
