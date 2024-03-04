import { Context2D } from 'src/entities/engine/2d/context';
import { Keyboard } from 'src/entities/engine/io/keyboard';
import { Mouse } from 'src/entities/engine/io/mouse';
import {
  Controller,
  ControllerConstructor,
} from 'src/entities/engine/io/types';
import { Loop } from 'src/entities/engine/loop';
import { Resize } from 'src/entities/engine/resize';

export interface Env {
  width: number;
  height: number;
}

export interface Args {
  controller?: ControllerConstructor;
}
export class Engine2D {
  loop: Loop;
  resize: Resize;
  keyboard: Keyboard;
  context2d: Context2D;
  controller: Controller;

  env: Env;

  constructor(args: Args = {}) {
    const { controller = Mouse } = args;
    const node = document.body;

    this.env = {
      width: node.offsetWidth,
      height: node.offsetHeight,
    };
    this.loop = new Loop();
    this.resize = new Resize(node);
    this.context2d = new Context2D(node.offsetWidth, node.offsetHeight);

    this.keyboard = new Keyboard();
    this.controller = new controller(this.context2d.canvas);

    this.resize.onChanged((w, h) => {
      this.env = {
        width: node.offsetWidth,
        height: node.offsetHeight,
      };
      this.context2d.resize(w, h);
    });
  }

  tick(
    cb: (value: {
      context: Context2D;
      controller: Controller;
      keyboard: Keyboard;
      time: DOMHighResTimeStamp;
    }) => void
  ) {
    this.loop.tick((time) => {
      this.context2d.clean();

      cb({
        time,
        context: this.context2d,
        keyboard: this.keyboard,
        controller: this.controller,
      });
    });
  }

  onResize(cb: (w: number, h: number) => void) {
    this.resize.onChanged((w, h) => {
      cb(w, h);
    });
  }

  destroy() {
    this.loop.destroy();
    this.resize.destroy();
    this.keyboard.destroy();
    this.context2d.destroy();
    this.controller.destroy();

    this.loop = undefined;
    this.resize = undefined;
    this.keyboard = undefined;
    this.context2d = undefined;
    this.controller = undefined;
  }
}
