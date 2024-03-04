import { Engine2D } from 'src/entities/engine/2d/engine';
import { AssetsLoader, ImageAsset, VideoAsset } from 'src/entities/engine/assets';

import floor_tiles from './images/floor_tiles.png';
import video from './images/video.mov';
import vovka from './images/vovka.png';

export class Images {
  static id = 'Images';

  game2D: Engine2D;

  constructor() {
    this.game2D = new Engine2D();
    const imageLoader = new AssetsLoader([
      new ImageAsset(vovka),
      new ImageAsset(floor_tiles),
      new VideoAsset(video, 640, 360),
    ]);

     
    imageLoader.load().then(([vovka, floor_tiles, video]) => {
      this.game2D.tick(({ context }) => {
        context.ctx.drawImage(floor_tiles.data, 230, 20, 80, 140, 200, 130, 100, 120);
        context.ctx.drawImage(vovka.data, 80, 0, 135, 135, 90, 90, 65, 65);
        context.ctx.drawImage(video.data, 300, 150, 100, 100);
      });
    });
  }

  destroy() {
    this.game2D.destroy();

    this.game2D = undefined;
  }
}
