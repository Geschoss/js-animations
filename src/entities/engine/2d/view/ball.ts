import { View } from './base';

type BallViewType = { x: number; y: number; radius: number; color: string };

export class BallView implements View<BallViewType> {
  render(ctx: CanvasRenderingContext2D, { x, y, radius, color }) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
    ctx.restore();
  }
}
