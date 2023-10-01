import { Loop } from '@/entities/engine/loop';
import { Mouse } from '@/entities/engine/io/mouse';
import { Resize } from '@/entities/engine/resize';
import { Context2D } from '@/entities/engine/2d/context';
import { Controller, ControllerConstructor } from '@/entities/engine/io/types';

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

    this.controller = new controller(this.context2d.canvas);

    this.resize.changed((w, h) => {
      this.context2d.resize(w, h);
    });
  }

  tick(
    cb: (
      ctx: CanvasRenderingContext2D,
      mouse: Controller,
      time: DOMHighResTimeStamp
    ) => void
  ) {
    this.loop.tick((time) => {
      this.context2d.clean();

      cb(this.context2d.ctx, this.controller, time);
    });
  }

  destroy() {
    this.loop.destroy();
    this.resize.destroy();
    this.context2d.destroy();
    this.controller.destroy();

    this.loop = undefined;
    this.resize = undefined;
    this.context2d = undefined;
    this.controller = undefined;
  }
}
