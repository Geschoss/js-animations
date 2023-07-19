import { Bullet, Position, WeaponInstance } from './types';

export class MachineGun implements WeaponInstance {
  name = 'Пулимет';
  rate: number;
  bulletSpeed: number;
  prevShotTime: number;

  constructor() {
    this.rate = 10;
    this.prevShotTime = 0;
    this.bulletSpeed = 6;
  }

  shot(shooter: Position) {
    let now = new Date().getTime();

    if (now - this.prevShotTime > 1000 / this.rate) {
      this.prevShotTime = now;
      return new Bullets(shooter.x, shooter.y, shooter.rotation, this.bulletSpeed);
    }
    return undefined;
  }
}

export class Bullets implements Bullet {
  x: number;
  y: number;
  speed: number;
  rotation: number;

  constructor(x, y, rotation, speed = 3) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.rotation = rotation;
  }

  think() {
    this.x += this.speed * Math.cos(this.rotation);
    this.y += this.speed * Math.sin(this.rotation);
  }

  render(ctx: CanvasRenderingContext2D) {
    let dx = 5 * Math.cos(this.rotation);
    let dy = 5 * Math.sin(this.rotation);
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = '#ff0000';
    ctx.lineWidth = 2;
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x + dx, this.y + dy);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
  }
}
