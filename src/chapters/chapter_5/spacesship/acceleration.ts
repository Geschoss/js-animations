export interface Acceleration {
  up(): void;
  left(): void;
  forward(): void;
  rigth(): void;
  stop(): void;
  calculate(): { vx: number; vy: number; rotation: number };
}
export class Space implements Acceleration {
  vr = 0;
  vx = 0;
  vy = 0;
  trust = 0;
  gravity = 0.01;
  rotation = 0;

  left() {
    this.vr = -3;
  }
  rigth() {
    this.vr = 3;
  }
  up() {
    this.trust = 0.05;
  }
  forward() {
    this.vr = 0;
  }
  stop() {
    this.trust = 0;
  }

  calculate() {
    this.rotation += (this.vr * Math.PI) / 180;
    let ax = Math.cos(this.rotation) * this.trust;
    let ay = Math.sin(this.rotation) * this.trust;
    this.vx += ax;
    this.vy += ay;
    this.vx += this.vx > 0 ? -this.gravity : this.gravity;
    this.vy += this.vy > 0 ? -this.gravity : this.gravity;

    return { vx: this.vx, vy: this.vy, rotation: this.rotation };
  }
}
