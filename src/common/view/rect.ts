import { View } from './base';

type RectViewType = {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
};

export class RectView implements View<RectViewType> {
  render(ctx: CanvasRenderingContext2D, { x, y, width, height, color }) {
    ctx.save();
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
  }
}
