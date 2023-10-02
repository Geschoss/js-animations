import { Controller } from '@/entities/engine/io/types';

export class TouchTap implements Controller {
  x = 0;
  y = 0;
  pressed = false;

  rect: DOMRect;
  canvas: HTMLCanvasElement;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    canvas.addEventListener('touchstart', this.touch_start, false);
    canvas.addEventListener('touchmove', this.touch_move, false);
    canvas.addEventListener('touchend', this.touch_end, false);
  }

  destroy() {
    this.canvas.removeEventListener('touchstart', this.touch_start, false);
    this.canvas.removeEventListener('touchmove', this.touch_move, false);
    this.canvas.removeEventListener('touchend', this.touch_end, false);
  }
  touch_start = () => {
    this.pressed = true;
  };
  touch_end = () => {
    this.pressed = false;
    this.x = 0;
    this.y = 0;
  };

  touch_move = (event: TouchEvent) => {
    let x: number = 0;
    let y: number = 0;
    let touch_event = event.touches[0]; // first touch
    if (touch_event.pageX || touch_event.pageY) {
      x = touch_event.pageX;
      y = touch_event.pageY;
    } else {
      x =
        touch_event.clientX +
        document.body.scrollLeft +
        document.documentElement.scrollLeft;
      y =
        touch_event.clientY +
        document.body.scrollTop +
        document.documentElement.scrollTop;
    }
    x -= this.canvas.offsetLeft;
    y -= this.canvas.offsetTop;

    this.x = x;
    this.y = y;
  };
}
