import { KeyboardInjector, Keyboard } from '../../common/io';
import { Env, Module } from '../../common/module';
import { Space } from './acceleration';
import { Ship } from './ship';
import { DefaultShip, Ef_200Ship, EF_50Ship, Ex_100Ship, ShipView, T_50Ship } from './ships';
import { Bullet, MachineGun, RocketLaucher, PlasmaGun } from './weapons';

const SHIPS_VIEWS: ShipView[] = [
  EF_50Ship,
  T_50Ship,
  DefaultShip,
  Ex_100Ship,
  Ef_200Ship,
];
const WEAPONS = [
  MachineGun,
  RocketLaucher,
  PlasmaGun,
];
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
export const spacesshipGame: Module = {
  settings: {
    name: 'Spacesship',
    injectors: [KeyboardInjector],
  },
  init(_, env) {
    let keyboard = env.injectors.keyboard;
    let acceleration = new Space();
    let shipView = SHIPS_VIEWS[current_ship_view];
    ship = new Ship(
      keyboard,
      acceleration,
      env.width / 2,
      env.height / 2,
      WEAPONS[current_weapon_view],
      shipView,
    );

    keyboard.down({
      keys: [
        Keyboard.keys.KeyL,
        Keyboard.keys.Semicolon,
        Keyboard.keys.KeyO,
        Keyboard.keys.KeyP,

      ],
      cb: (key) => {
        if (key === Keyboard.keys.KeyL) {
          changeShip(ship, SHIPS_VIEWS, 1);
        }
        if (key === Keyboard.keys.Semicolon) {
          changeShip(ship, SHIPS_VIEWS, -1);
        }
        if (key === Keyboard.keys.KeyO) {
          changeWeapon(ship, 1);
        }
        if (key === Keyboard.keys.KeyP) {
          changeWeapon(ship, -1);
        }
      },
    });
  },
  render(ctx, env) {
    renderHelpText(ctx, env);
    renderShipName(ctx, env, ship);

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
      inRange(0, env.width, bullet.x) && inRange(0, env.height, bullet.y),
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
  ship.changeChip(
    shipViews[current_ship_view],
  );
}

function changeWeapon(ship: Ship, direction: number) {
  current_weapon_view += direction;
  if (current_weapon_view >= WEAPONS.length) {
    current_weapon_view = 0;
  }
  if (current_weapon_view < 0) {
    current_weapon_view = WEAPONS.length - 1;
  }
  ship.cnahgeWeapon(
    WEAPONS[current_weapon_view],
  );
}

function renderHelpText(ctx: CanvasRenderingContext2D, env: Env) {
  ctx.save();
  ctx.fillStyle = '#ff0000';
  ctx.font = '20px Arial';
  ctx.fillText(`Смена корабля: Д или Ж`, 10, env.height - 10);
  ctx.fillText(`Смена оружия: Щ или З`, 10, env.height - 30);
  ctx.restore();
}

function renderShipName(ctx: CanvasRenderingContext2D, env: Env, ship: Ship) {
  ctx.save();
  ctx.fillStyle = '#ff0000';
  ctx.font = '20px Arial';
  ctx.fillText(`корабль: ${ship.view.name}`, 10, env.height - 50);
  ctx.fillText(`оружие: ${ship.view.weapon_name}`, 10, env.height - 70);
  ctx.restore();
}