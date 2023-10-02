export class Ball {
  x = 200;
  y = 100;
  scaleX = 1;
  scaleY = 1;
  lineWidth = 1;
  color = '';
  radius = 10;
  rotation = 0;

  constructor(x = 100, y = 100, radius = 20, color = '#ff0000') {
    this.x = x;
    this.y = y;
    this.color = color;
    this.radius = radius;
  }

  ratateTo({ x, y }: { x: number; y: number }) {
    let dx = x - this.x;
    let dy = y - this.y;
    this.rotation = Math.atan2(dy, dx);
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    ctx.scale(this.scaleX, this.scaleY);
    ctx.lineWidth = this.lineWidth;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    // x, y, radius, start_angle, end_angle, anti-clockwise
    ctx.arc(0, 0, this.radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
    if (this.lineWidth > 0) {
      ctx.stroke();
    }
    ctx.restore();
  }
}
