import { Canvas2D } from '@/entities/engine/2d/canvas';
import { ImageAsset, AssetsLoader, VideoAsset } from '@/entities/engine/assets';

import vovka from './images/vovka.png';
import floor_tiles from './images/floor_tiles.png';
import video from './images/video.mov';

export class Images {
  static id = 'Images';

  game2D: Canvas2D;

  constructor() {
    this.game2D = new Canvas2D();
    const imageLoader = new AssetsLoader([
      new ImageAsset(vovka),
      new ImageAsset(floor_tiles),
      new VideoAsset(video, 640, 360),
    ]);

     
    imageLoader.load().then(([vovka, floor_tiles, video]) => {
      this.game2D.tick((ctx) => {
        ctx.drawImage(floor_tiles.data, 230, 20, 80, 140, 200, 130, 100, 120);
        ctx.drawImage(vovka.data, 80, 0, 135, 135, 90, 90, 65, 65);
        ctx.drawImage(video.data, 300, 150, 100, 100);
      });
    });
  }

  destroy() {
    this.game2D.destroy();

    this.game2D = undefined;
  }
}

// let image = {
//   status: 'new',
//   data: new Image(),
// };
// let image_2;
// let video;
// export const imageModule: Module = {
//   settings: {
//     name: 'image',
//   },
//   init() {
//     image.data.src = './vovka.png';
//     image.data.onload = () => {
//       image.status = 'ready';
//     };
//     image_2 = document.getElementById('picture');
//     video = document.getElementById('video');
//   },
//   render(ctx) {
//     if (image.status === 'ready') {
//       ctx.drawImage(image.data, 80, 0, 135, 135, 90, 90, 65, 65);
//     }

//     ctx.drawImage(image_2, 230, 20, 80, 140, 200, 130, 100, 120);

//     ctx.drawImage(video, 300, 150, 100, 100);
//   },
//   destroy() {},
// };
