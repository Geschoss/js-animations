import { Bullet, WeaponInstance, Weapon } from '../weapons';
import { BaseShip, ShipViewInstance } from './types';

export class DefaultShip implements ShipViewInstance {
  name = 'classic';
  weapon_name: string;
  weapon: WeaponInstance;

  constructor(weapon: Weapon) {
    this.weapon_name = weapon.name;
    this.weapon = new weapon();
  }

  changeWeapon(weapon: Weapon) {
    this.weapon_name = weapon.name;
    this.weapon = new weapon();
  }

  shot(ship: BaseShip): Bullet[] | undefined {
    const bullet = this.weapon.shot({ x: ship.x, y: ship.y, rotation: ship.rotation });
    if (bullet) {
      return [bullet];
    }
    return undefined;
  }

  render(ctx: CanvasRenderingContext2D, ship: BaseShip): void {
    ctx.save();
    ctx.translate(ship.x, ship.y);
    ctx.rotate(ship.rotation);

    ctx.lineWidth = 1;
    ctx.strokeStyle = '#ff0000';
    ctx.beginPath();
    ctx.moveTo(10, 0);
    ctx.lineTo(-10, 10);
    ctx.lineTo(-5, 0);
    ctx.lineTo(-10, -10);
    ctx.lineTo(10, 0);
    ctx.stroke();

    if (ship.moving) {
      let flameSize = Math.random() > 0.5 ? 17 : 15;
      ctx.beginPath();
      ctx.strokeStyle = '#ff9200';
      ctx.moveTo(-7.5, -5);
      ctx.lineTo(-flameSize, 0);
      ctx.lineTo(-7.5, 5);
      ctx.stroke();
    }
    ctx.restore();
  }
}