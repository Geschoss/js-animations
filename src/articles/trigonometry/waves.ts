import { Module } from '../../common/module';

let ball_1: Ball;
let ball_2: Ball;
let ball_3: Ball;
let ball_4: Ball;
let angle = 0;
export const wavesModule: Module = {
  settings: {
    name: 'waves',
  },
  init(_, env) {
    ball_1 = new Ball(env.width / 2, env.height / 2, 40, '#ffee00');
    ball_2 = new Ball(env.width / 2, env.height / 2, 40, '#00ff00');
    ball_3 = new Ball(env.width / 2, env.height / 2, 40, '#0000ff');
    ball_4 = new Ball(env.width / 2, env.height / 2, 40);
  },
  render(ctx, env) {
    angle += 0.03;
    let half_x = env.width / 2;
    let half_y = env.width / 2;
    ball_1.x = half_x + Math.sin(angle * 0.2) * half_x;

    ball_2.y = half_y + Math.sin(angle * 0.3) * half_y;

    ball_3.y = half_y + Math.sin(angle * 0.4) * half_y;
    ball_3.x = half_x + Math.sin(angle) * half_x;

    ball_4.y = half_y + Math.sin(angle * 0.5) * half_y;
    ball_4.x = half_x + Math.cos(angle * 0.2) * half_x;

    ball_1.draw(ctx);
    ball_2.draw(ctx);
    ball_3.draw(ctx);
    ball_4.draw(ctx);
  },
  destroy() {},
};

class Ball {
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

  draw(ctx: CanvasRenderingContext2D) {
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
