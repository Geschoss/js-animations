import { Bullet, Weapon, WeaponInstance } from '../weapons';
import { BaseShip, ShipViewInstance } from './types';

export class Ex_100Ship implements ShipViewInstance {
  static name = 'эх-100';
  weapon_name: string;
  weapons: [WeaponInstance, WeaponInstance];

  constructor(weapon: Weapon) {
    const w = new weapon();
    this.weapon_name = w.name;
    this.weapons = [w, new weapon()];
  }

  changeWeapon(weapon: Weapon) {
    const w = new weapon();
    this.weapon_name = w.name;
    this.weapons = [w, new weapon()];
  }

  shot(ship: BaseShip): Bullet[] {
    const distance = 15;
    const angle_1 = 1.88;
    const bullet_1 = this.weapons[0].shot({
      x: ship.x + distance * Math.cos(ship.rotation + Math.PI * angle_1),
      y: ship.y + distance * Math.sin(ship.rotation + Math.PI * angle_1),
      rotation: ship.rotation,
    });
    const angle_2 = 0.12;
    const bullet_2 = this.weapons[1].shot({
      x: ship.x + distance * Math.cos(ship.rotation + Math.PI * angle_2),
      y: ship.y + distance * Math.sin(ship.rotation + Math.PI * angle_2),
      rotation: ship.rotation,
    });
    let bullets = [];
    if (bullet_1) {
      bullets.push(bullet_1);
    }
    if (bullet_2) {
      bullets.push(bullet_2);
    }

    return bullets.length > 0 ? bullets : undefined;
  }

  render(ctx: CanvasRenderingContext2D, data: BaseShip): void {
    ctx.save();

    ctx.translate(data.x, data.y);
    ctx.rotate(data.rotation);

    ctx.lineWidth = 1;
    ctx.strokeStyle = '#ff0000';
    ctx.beginPath();
    ctx.moveTo(15, 10);
    ctx.lineTo(10, 10);
    ctx.lineTo(10, 5);
    ctx.lineTo(-10, 5);
    ctx.lineTo(-10, 10);
    ctx.lineTo(-15, 10);
    ctx.lineTo(-15, -10);
    ctx.lineTo(-10, -10);
    ctx.lineTo(-10, -5);
    ctx.lineTo(-10, -5);
    ctx.lineTo(10, -5);
    ctx.lineTo(10, -10);
    ctx.lineTo(15, -10);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(15, 10);
    ctx.quadraticCurveTo(
      30,
      0,
      15,
      -10,
    );
    ctx.stroke();

    if (data.moving) {
      ctx.beginPath();
      ctx.strokeStyle = '#ff9200';
      ctx.moveTo(-15, -10);
      ctx.lineTo(-coin(25, 22), -5);
      ctx.lineTo(-15, 0);
      ctx.stroke();

      ctx.beginPath();
      ctx.strokeStyle = '#ff9200';
      ctx.moveTo(-15, 10);
      ctx.lineTo(-coin(25, 22), 5);
      ctx.lineTo(-15, 0);
      ctx.stroke();
    }
    ctx.restore();
  }
}

function coin(a, b) {
  return Math.random() > 0.5 ? a : b;
}