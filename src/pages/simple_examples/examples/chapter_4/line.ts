import { Engine2D } from 'src/entities/engine/2d/engine';
import { Controller } from 'src/entities/engine/io/types';

import { isNil } from '../../../../shared/lib';

export class Line {
  static id = 'Line';

  pencil: Pencil;
  game2D: Engine2D;

  constructor() {
    this.game2D = new Engine2D();
    this.pencil = new Pencil();

    this.game2D.tick(({ context, controller }) => {
      this.pencil.draw(context.ctx, controller);
    });
  }

  destroy() {
    this.game2D.destroy();

    this.game2D = undefined;
    this.pencil = undefined;
  }
}

class Pencil {
  prevPos: { x: number; y: number };
  constructor() {}

  draw(ctx: CanvasRenderingContext2D, mouse: Controller) {
    if (isNil(this.prevPos) && mouse.pressed) {
      ctx.strokeStyle = '#ff0000';
      ctx.lineWidth = 2;
      ctx.lineCap = 'butt'; // how the end point of each line
      ctx.lineJoin = 'miter';
      ctx.miterLimit = 10;
      ctx.beginPath();
      ctx.moveTo(mouse.x, mouse.y);
      this.prevPos = { x: mouse.x, y: mouse.y };
    } else if (!isNil(this.prevPos) && mouse.pressed) {
      ctx.lineTo(mouse.x, mouse.y);
      this.prevPos = { x: mouse.x, y: mouse.y };
      ctx.stroke();
    } else if (!isNil(this.prevPos) && !mouse.pressed) {
      this.prevPos = null;
    }
  }
}
