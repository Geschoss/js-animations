import { Module } from '../../common/module';

let image = {
  status: 'new',
  data: new Image(),
};
let image_2;
let video;
export const imageModule: Module = {
  settings: {
    name: 'image',
  },
  init() {
    image.data.src = './vovka.png';
    image.data.onload = () => {
      image.status = 'ready';
    };
    image_2 = document.getElementById('picture');
    video = document.getElementById('video');
  },
  render(ctx) {
    if (image.status === 'ready') {
      ctx.drawImage(image.data, 80, 0, 135, 135, 90, 90, 65, 65);
    }

    ctx.drawImage(image_2, 230, 20, 80, 140, 200, 130, 100, 120)

    ctx.drawImage(video, 300, 150, 100, 100)
  },
  destroy() {},
};
