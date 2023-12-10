import { Engine2D } from 'src/entities/engine/2d/engine';
import { Color } from 'src/entities/engine/colors';
import { Controller } from 'src/entities/engine/io/types';

import { isNil } from '../../../../shared/lib';

export class Pixel {
  static id = 'pixel';

  game2D: Engine2D;
  pencil: Pencil;

  constructor() {
    this.game2D = new Engine2D();
    const env = this.game2D.env;
    const image_data = this.game2D.context2d.ctx.getImageData(
      0,
      0,
      env.width,
      env.height
    );
    this.pencil = new Pencil();

    this.game2D.tick((ctx, mouse) => {
      this.pencil.draw(ctx, mouse, image_data);
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
  brush_size = 25;
  brush_density = 50;
  brush_color = 0;

  constructor() {}

  draw(
    ctx: CanvasRenderingContext2D,
    mouse: Controller,
    image_data: ImageData
  ) {
    let pixels = image_data.data;
    if (isNil(this.prevPos) && mouse.pressed) {
      this.brush_color = Color.parse(Math.random() * 0xffffff, true);

      this.prevPos = { x: mouse.x, y: mouse.y };
    } else if (!isNil(this.prevPos) && mouse.pressed) {
      for (let i = 0; i < this.brush_density; i++) {
        let angle = Math.random() * Math.PI * 2;
        let radius = Math.random() * this.brush_size;
        let xpos = (mouse.x + Math.cos(angle) * radius) | 0;
        let ypos = (mouse.y + Math.sin(angle) * radius) | 0;
        let offset = (xpos + ypos * image_data.width) * 4;

        pixels[offset] = (this.brush_color >> 16) & 0xff;
        pixels[offset + 1] = (this.brush_color >> 8) & 0xff;
        pixels[offset + 2] = this.brush_color & 0xff;
        pixels[offset + 3] = 255;
      }
      ctx.putImageData(image_data, 0, 0);
      this.prevPos = { x: mouse.x, y: mouse.y };
    } else if (!isNil(this.prevPos) && !mouse.pressed) {
      this.prevPos = null;
    }
  }
}
