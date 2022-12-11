export class Mouse {
	x: number = 0;
  y: number = 0;
	rect: DOMRect;
  canvas: HTMLCanvasElement;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.rect = canvas.getBoundingClientRect();
    canvas.addEventListener('mousemove', this.move);
  }
  destroy() {
    this.canvas.removeEventListener('mousemove', this.move);
  }

  move = (e: MouseEvent) => {
    this.x = e.clientX - this.rect.left;
    this.y = e.clientY - this.rect.top;
  };
}
