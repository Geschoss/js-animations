import { Bullet, Shooter, Weapon } from './types';

export class RocketLaucher implements Weapon {
  rate: number;
  prevShotTime: number;

  constructor() {
    this.rate = 1;
    this.prevShotTime = 0;
  }

  shot(shooter: Shooter, bullets: Bullet[]) {
    let now = new Date().getTime();
    if (now - this.prevShotTime > 1000 / this.rate) {
      this.prevShotTime = now;
      bullets.push(new Rocket(shooter.x, shooter.y, shooter.rotation));
    }
  }
}

export class Rocket implements Bullet {
  x: number;
  y: number;
  speed: number;
  rotation: number;
  acceleration: number;
  max_speed: number;

  constructor(x = 0, y = 0, rotation = 0, speed = 0, acceleration = 0.04) {
    this.x = x + 5 * Math.cos(rotation);
    this.y = y + 5 * Math.sin(rotation);
    this.speed = speed;
    this.rotation = rotation;
    this.acceleration = acceleration;
    this.max_speed = 6 ;
  }

  think() {
    this.speed += this.acceleration;
    if (this.speed >= this.max_speed) {
      this.acceleration = 0;
    } else {
      this.acceleration += 0.02;
    }
    this.x += this.speed * Math.cos(this.rotation);
    this.y += this.speed * Math.sin(this.rotation);
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#ff0000';
    ctx.beginPath();
    ctx.moveTo(8, 1);
    ctx.lineTo(-8, 1);
    ctx.lineTo(-8, -1);
    ctx.lineTo(8, -1);
    ctx.lineTo(8, 1);
    ctx.stroke();
    if (Math.random() > 0.1) {
      ctx.beginPath();
      ctx.strokeStyle = '#ff9200';
      ctx.moveTo(-8, -2);
      ctx.lineTo(-12, 0);
      ctx.lineTo(-8, 2);
      ctx.stroke();
    }
    ctx.restore();
  }
}
