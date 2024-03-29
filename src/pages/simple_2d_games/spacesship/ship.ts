import { Keyboard } from 'src/entities/engine/io/keyboard';

import { Acceleration } from './acceleration';
import { ShipView, ShipViewInstance } from './ships';
import { Weapon } from './weapons';

export class Ship {
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  moving: boolean;
  keyboard: Keyboard;
  acceleration: Acceleration;
  weapon: Weapon;
  view: ShipViewInstance;

  constructor(
    keyboard: Keyboard,
    acceleration: Acceleration,
    x = 0,
    y = 0,
    weapon: Weapon,
    view: ShipView
  ) {
    this.x = x;
    this.y = y;
    this.width = 25;
    this.height = 20;
    this.rotation = 0;
    this.keyboard = keyboard;
    this.moving = false;
    this.acceleration = acceleration;
    this.weapon = weapon;
    this.view = new view(weapon);

    this.keyboard.up({
      keys: ['ArrowUp', 'ArrowLeft', 'ArrowRight'],
      cb: (key) => {
        if (key === 'ArrowUp') {
          this.moving = false;
          this.acceleration.stop();
          return;
        }
        this.acceleration.forward();
      },
    });
  }

  changeChip(view: ShipView) {
    this.view = new view(this.weapon);
  }

  cnahgeWeapon(weapon: Weapon) {
    this.view.changeWeapon(weapon);
  }

  shot(world) {
    const bullets = this.view.shot(this);
    if (bullets) {
      world.bullets.push(...bullets);
    }
  }

  think(world) {
    if (this.keyboard.pressed('Space')) {
      this.shot(world);
    }
    if (this.keyboard.pressed('ArrowLeft')) {
      this.acceleration.left();
    }
    if (this.keyboard.pressed('ArrowRight')) {
      this.acceleration.rigth();
    }
    if (this.keyboard.pressed('ArrowUp')) {
      this.acceleration.up();
      this.moving = true;
    }

    let { vx, vy, rotation } = this.acceleration.calculate();
    this.rotation = rotation;
    this.x += vx;
    this.y += vy;
  }

  render(ctx: CanvasRenderingContext2D) {
    this.view.render(ctx, this);
  }
}
