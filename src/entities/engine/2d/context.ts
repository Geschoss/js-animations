export class Context2D {
  width: number;
  height: number;

  ctx: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;

    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');

    this.canvas.width = this.width;
    this.canvas.height = this.height;

    document.body.appendChild(this.canvas);
  }

  destroy() {
    this.ctx = null;
    this.canvas.remove();
  }

  clean() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  resize(w: number, h: number) {
    this.width = w;
    this.height = h;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }
}
