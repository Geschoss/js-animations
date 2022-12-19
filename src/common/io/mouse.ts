export class Mouse {
  x = 0;
  y = 0;
  leftButtonDown = false;
  rect: DOMRect;
  canvas: HTMLCanvasElement;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    canvas.addEventListener('mousemove', this.move, false);
    canvas.addEventListener('mousedown', this.mousedown, false);
    canvas.addEventListener('mouseup', this.mouseup, false);
  }

  destroy() {
    this.canvas.removeEventListener('mousemove', this.move, false);
    this.canvas.removeEventListener('mousedown', this.mousedown, false);
    this.canvas.removeEventListener('mouseup', this.mouseup, false);
  }

  mousedown = (event: MouseEvent) => {
    this.leftButtonDown = true;
  };

  mouseup = (event: MouseEvent) => {
    this.leftButtonDown = false;
  };

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

  copyPos() {
    return { x: this.x, y: this.y };
  }
}

export const MouseInjector = {
  name: 'mouse',
  instance: Mouse,
  deps: [
    {
      name: 'canvas',
    },
  ],
};
