import { Bullet, Position, WeaponInstance } from './types';

export class PlasmaGun implements WeaponInstance {
  static name = 'Плазма';
  rate: number;
  bulletSpeed: number;
  prevShotTime: number;

  constructor() {
    this.rate = 5;
    this.prevShotTime = 0;
    this.bulletSpeed = 6;
  }

  shot(shooter: Position) {
    let now = new Date().getTime();

    if (now - this.prevShotTime > 1000 / this.rate) {
      this.prevShotTime = now;
      return new Plasma(shooter.x, shooter.y, shooter.rotation, this.bulletSpeed);
    }
    return undefined;
  }
}

export class Plasma implements Bullet {
  x: number;
  y: number;
  speed: number;
  rotation: number;

  constructor(x, y, rotation, speed = 4) {
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
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = '#00ff00';
    ctx.beginPath();
    ctx.arc(this.x, this.y, 3, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();

    ctx.restore();

  }
}
