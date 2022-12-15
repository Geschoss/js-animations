export class Mouse {
  x: number = 0;
  y: number = 0;
  rect: DOMRect;
  canvas: HTMLCanvasElement;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    canvas.addEventListener('mousemove', this.move, false);
  }

  destroy() {
    this.canvas.removeEventListener('mousemove', this.move, false);
  }

  move = (event: MouseEvent) => {
    let x: number = 0;
    let y: number = 0;
    if (event.pageX || event.pageY) {
      x = event.pageX;
      y = event.pageY;
    } else {
      x =
        event.clientX +
        document.body.scrollLeft +
        document.documentElement.scrollLeft;
      y =
        event.clientY +
        document.body.scrollTop +
        document.documentElement.scrollTop;
    }
    x -= this.canvas.offsetLeft;
    y -= this.canvas.offsetTop;
    
    this.x = x;
    this.y = y;
  };
}
