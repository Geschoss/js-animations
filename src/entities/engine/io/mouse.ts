import { Controller } from 'src/entities/engine/io/types';

export class Mouse implements Controller {
  x = 0;
  y = 0;
  pressed = false;

  rect: DOMRect;
  canvas: HTMLElement;

  constructor(canvas: HTMLElement) {
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

  mousedown = (_: MouseEvent) => {
    this.pressed = true;
  };

  mouseup = (_: MouseEvent) => {
    this.pressed = false;
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
