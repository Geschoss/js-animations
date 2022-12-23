import { Keyboard } from '../../../common/io';
import { Acceleration } from './acceleration';
import { Weapon } from './weapons/types';

export class Ship {
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  showFlame: boolean;
  keyboard: Keyboard;
  acceleration: Acceleration;
  weapon: Weapon;

  constructor(
    keyboard: Keyboard,
    acceleration: Acceleration,
    x = 0,
    y = 0,
    weapon: Weapon
  ) {
    this.x = x;
    this.y = y;
    this.width = 25;
    this.height = 20;
    this.weapon = weapon;
    this.rotation = 0;
    this.keyboard = keyboard;
    this.showFlame = false;
    this.acceleration = acceleration;

    this.keyboard.up({
      keys: [
        Keyboard.keys.ArrowUp,
        Keyboard.keys.ArrowLeft,
        Keyboard.keys.ArrowRight,
      ],
      cb: (key) => {
        if (key === Keyboard.keys.ArrowUp) {
          this.showFlame = false;
          this.acceleration.stop();
          return;
        }
        this.acceleration.forward();
      },
    });
  }

  shot(world) {
    this.weapon.shot(this, world.bullets);
  }

  think(world) {
    if (this.keyboard.pressed(Keyboard.keys.Space)) {
      this.shot(world);
    }
    if (this.keyboard.pressed(Keyboard.keys.ArrowLeft)) {
      this.acceleration.left();
    }
    if (this.keyboard.pressed(Keyboard.keys.ArrowRight)) {
      this.acceleration.rigth();
    }
    if (this.keyboard.pressed(Keyboard.keys.ArrowUp)) {
      this.acceleration.up();
      this.showFlame = true;
    }

    let { vx, vy, rotation } = this.acceleration.calculate();
    this.rotation = rotation;
    this.x += vx;
    this.y += vy;
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);

    ctx.lineWidth = 1;
    ctx.strokeStyle = '#ff0000';
    ctx.beginPath();
    ctx.moveTo(10, 0);
    ctx.lineTo(-10, 10);
    ctx.lineTo(-5, 0);
    ctx.lineTo(-10, -10);
    ctx.lineTo(10, 0);
    ctx.stroke();

    if (this.showFlame) {
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
