export class Ball {
  x: number;
  y: number;
  r: number;
  c: string;
  vx: number;
  vy: number;
  originX: number;
  originY: number;

  constructor(x = 0, y = 0, r = 0, c = '#ff6600') {
    this.x = x;
    this.y = y;
    this.r = r;
    this.c = c;
    this.vx = 0;
    this.vy = 0;
    this.originX = x;
    this.originY = y;
  }

  set(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  think(p: Ball, env) {
    let dx = this.x - p.x;
    let dy = this.y - p.y;
    let dist = Math.sqrt(dx * dx + dy * dy);

    // interaction
    if (dist < p.r) {
      let angle = Math.atan2(dy, dx);
      let tx = p.x + Math.cos(angle) * p.r;
      let ty = p.y + Math.sin(angle) * p.r;

      this.vx += tx - this.x;
      this.vy += ty - this.y;
    }

    // spring back
    this.vx += env.spring.vx(this.x, this.originX, env )
    this.vy += env.spring.vy(this.y, this.originY, env)    

    // friction
    this.vx *= env.friction.vx(this.x, this.originX, env);
    this.vy *= env.friction.vy(this.x, this.originX, env);

    // actual move
    this.x += this.vx;
    this.y += this.vy;
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    ctx.fillStyle = this.c;
    ctx.fill();
    ctx.closePath();
  }
}
