import { Bullet, Weapon, WeaponInstance } from '../weapons';
import { BaseShip, ShipViewInstance } from './types';

export class Ef_200Ship implements ShipViewInstance {
  static name = 'еф-100';
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
    const distance = 17;
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
    ctx.strokeStyle = '#ff0000';

    ctx.beginPath();
    ctx.arc(0, 0, 15, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.closePath();


    ctx.beginPath();
    ctx.arc(0, 0, 5, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(3, 15);
    ctx.quadraticCurveTo(
      5,
      22,
      10,
      21,
    );
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(8, 13);
    ctx.quadraticCurveTo(
      10,
      18,
      15,
      17,
    );
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(15, 17);
    ctx.lineTo(20, 17);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(10, 21);
    ctx.lineTo(20, 21);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(20, 21);
    ctx.lineTo(20, 17);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(20, 21);
    ctx.lineTo(24, 19);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(20, 17);
    ctx.lineTo(24, 18);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(13, 7);
    ctx.lineTo(30, 3);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(15, 2);
    ctx.lineTo(30, 2);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(13, -7);
    ctx.lineTo(30, -3);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(15, -2);
    ctx.lineTo(30, -2);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(15, 0);
    ctx.lineTo(5, 0);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, 15);
    ctx.lineTo(0, 5);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, -15);
    ctx.lineTo(0, -5);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(-15, 0);
    ctx.lineTo(-5, 0);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(4, 4);
    ctx.lineTo(11, 11);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(4, -4);
    ctx.lineTo(11, -11);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(-4, -4);
    ctx.lineTo(-11, -11);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(-4, 4);
    ctx.lineTo(-11, 11);
    ctx.stroke();

    if (data.moving) {
      ctx.beginPath();
      ctx.strokeStyle = '#ff9200';
      ctx.moveTo(-10, -12);
      ctx.lineTo(-coin(21, 19), -11);
      ctx.lineTo(-14, -7);
      ctx.stroke();

      ctx.beginPath();
      ctx.strokeStyle = '#ff9200';
      ctx.moveTo(-12, -7);
      ctx.lineTo(-coin(22, 20), -4);
      ctx.lineTo(-14, 0);
      ctx.stroke();

      ctx.beginPath();
      ctx.strokeStyle = '#ff9200';
      ctx.moveTo(-12, 7);
      ctx.lineTo(-coin(22, 20), 4);
      ctx.lineTo(-14, 0);
      ctx.stroke();

      ctx.beginPath();
      ctx.strokeStyle = '#ff9200';
      ctx.moveTo(-14, 7);
      ctx.lineTo(-coin(21, 19), 11);
      ctx.lineTo(-10, 12);
      ctx.stroke();
    }
    ctx.restore();
  }
}

function coin(a, b) {
  return Math.random() > 0.5 ? a : b;
}