import { coin } from '../../../lib';
import { Bullet, WeaponInstance, Weapon } from '../weapons';
import { BaseShip, ShipViewInstance } from './types';

export class EF_50Ship implements ShipViewInstance {
  name = 'еф-50';
  weapon_name: string;
  weapons: [WeaponInstance, WeaponInstance, WeaponInstance];

  constructor(weapon: Weapon) {
    this.weapon_name = weapon.name;
    this.weapons = [new weapon(), new weapon(), new weapon()];
  }

  changeWeapon(weapon: Weapon) {
    this.weapon_name = weapon.name;
    this.weapons = [new weapon(), new weapon(), new weapon()];
  }

  shot(ship: BaseShip): Bullet[] {
    const distance = 15;
    const bullets = [];

    const angle_1 = 1.84;
    const bullet_1 = this.weapons[0].shot({
      x: ship.x + distance * Math.cos(ship.rotation + Math.PI * angle_1),
      y: ship.y + distance * Math.sin(ship.rotation + Math.PI * angle_1),
      rotation: ship.rotation - 0.03,
    });
    if (bullet_1) {
      bullets.push(bullet_1);
    }

    const angle_2 = 0.16;
    const bullet_2 = this.weapons[1].shot({
      x: ship.x + distance * Math.cos(ship.rotation + Math.PI * angle_2),
      y: ship.y + distance * Math.sin(ship.rotation + Math.PI * angle_2),
      rotation: ship.rotation + 0.03,
    });
    if (bullet_2) {
      bullets.push(bullet_2);
    }

    const angle_3 = 0;
    const bullet_3 = this.weapons[2].shot({
      x: ship.x + distance * Math.cos(ship.rotation + Math.PI * angle_3),
      y: ship.y + distance * Math.sin(ship.rotation + Math.PI * angle_3),
      rotation: ship.rotation,
    });
    if (bullet_3) {
      bullets.push(bullet_3);
    }

    return bullets.length > 0 ? bullets : undefined;
  }

  render(ctx: CanvasRenderingContext2D, ship: BaseShip): void {
    ctx.save();
    ctx.translate(ship.x, ship.y);
    ctx.rotate(ship.rotation);

    ctx.lineWidth = 1;
    ctx.strokeStyle = '#ff0000';
    ctx.beginPath();
    ctx.moveTo(20, 0);
    ctx.lineTo(15, -10);
    ctx.lineTo(-15, -15);
    ctx.lineTo(-10, 0);
    ctx.lineTo(-15, 15);
    ctx.lineTo(15, 10);
    ctx.lineTo(20, 0);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(15, -10);
    ctx.quadraticCurveTo(
      8,
      0,
      15,
      10,
    );
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(-12, -2);
    ctx.lineTo(-20, -2);
    ctx.lineTo(-20, -9);
    ctx.lineTo(-14, -9);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(-12, 2);
    ctx.lineTo(-20, 2);
    ctx.lineTo(-20, 9);
    ctx.lineTo(-14, 9);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(7, 11);
    ctx.lineTo(7, 15);
    ctx.lineTo(14, 15);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(7, -11);
    ctx.lineTo(7, -15);
    ctx.lineTo(14, -15);
    ctx.stroke();

    if (ship.moving) {
      ctx.strokeStyle = '#ff9200';
      ctx.beginPath();
      ctx.moveTo(-20, -9);
      ctx.lineTo(-coin(30, 27), -6);
      ctx.lineTo(-20, -2);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(-20, 9);
      ctx.lineTo(-coin(30, 27), 6);
      ctx.lineTo(-20, 2);
      ctx.stroke();
    }
    ctx.restore();
  }
}