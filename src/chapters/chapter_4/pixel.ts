import { Color, parseColor } from '../../common/colors';
import { Mouse, MouseInjector } from '../../common/io/mouse';
import { Module } from '../../common/module';
import { isNil } from '../../lib';

let pencil: Pencil;
let image_data: ImageData;
export const pixelModule: Module = {
  settings: {
    name: 'pixel',
    injectors: [MouseInjector],
  },
  init(_, env, ctx) {
    image_data = ctx.getImageData(0, 0, env.width, env.height);
    pencil = new Pencil(env.injectors.mouse);
  },
  render(ctx) {
    pencil.draw(ctx, image_data);
    return cleanup;
  },
  destroy() {},
};

function cleanup() {}

class Pencil {
  mouse: Mouse;
  prevPos: { x: number; y: number };
  brush_size = 25;
  brush_density = 50;
  brush_color = 0;

  constructor(mouse: Mouse) {
    this.mouse = mouse;
  }

  draw(ctx: CanvasRenderingContext2D, image_data: ImageData) {
    let pixels = image_data.data;
    if (isNil(this.prevPos) && this.mouse.leftButtonDown) {
      this.brush_color = Color.parse(Math.random() * 0xffffff, true);

      this.prevPos = this.mouse.copyPos();
    } else if (!isNil(this.prevPos) && this.mouse.leftButtonDown) {
      for (let i = 0; i < this.brush_density; i++) {
        let angle = Math.random() * Math.PI * 2;
        let radius = Math.random() * this.brush_size;
        let xpos = (this.mouse.x + Math.cos(angle) * radius) | 0;
        let ypos = (this.mouse.y + Math.sin(angle) * radius) | 0;
        let offset = (xpos + ypos * image_data.width) * 4;

        pixels[offset] = (this.brush_color >> 16) & 0xff;
        pixels[offset + 1] = (this.brush_color >> 8) & 0xff;
        pixels[offset + 2] = this.brush_color & 0xff;
        pixels[offset + 3] = 255;
      }
      ctx.putImageData(image_data, 0, 0);
      this.prevPos = this.mouse.copyPos();
    } else if (!isNil(this.prevPos) && !this.mouse.leftButtonDown) {
      this.prevPos = null;
    }
  }
}
