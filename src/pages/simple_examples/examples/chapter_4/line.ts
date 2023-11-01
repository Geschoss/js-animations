import { isNil } from '../../../../shared/lib';
import { Controller } from '@/entities/engine/io/types';
import { Engine2D } from '@/entities/engine/2d/engine';

export class Line {
  static id = 'Line';

  pencil: Pencil;
  game2D: Engine2D;

  constructor() {
    this.game2D = new Engine2D();
    this.pencil = new Pencil();

    this.game2D.tick((ctx, mouse) => {
      this.pencil.draw(ctx, mouse);
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
