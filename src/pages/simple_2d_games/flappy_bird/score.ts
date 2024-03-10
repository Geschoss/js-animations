import { Env } from 'src/entities/engine/2d/engine';

export class Score {
  value: number;
  constructor() {
    this.value = 0;
  }

  reset() {
    this.value = 0;
  }

  increment() {
    this.value += 1;
  }
  render(ctx: CanvasRenderingContext2D, env: Env) {
    ctx.font = '35px Arial';
    ctx.fillStyle = '#0000ff';
    ctx.fillText(`Score: ${this.value}`, env.width / 2 - 70, 150);
  }
}
