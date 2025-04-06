export interface Asset {
  isLoaded: boolean;
  data: HTMLVideoElement | HTMLImageElement | HTMLAudioElement;
  load(cb: () => void): void;
}

export class AudioAsset implements Asset {
  url: string;
  data: HTMLAudioElement;
  status: 'new' | 'loaded';

  constructor(url: string) {
    this.url = url;
    this.data = document.createElement('audio');

    this.status = 'new';
  }

  load(cb: () => void) {
    this.data.setAttribute('src', this.url);
    this.data.addEventListener('loadeddata', () => {
      if (this.data.readyState >= 3) {
        cb();
      }
    });
  }

  get isLoaded() {
    return this.status === 'loaded';
  }
}

export class VideoAsset implements Asset {
  url: string;
  data: HTMLVideoElement;
  status: 'new' | 'loaded';

  constructor(url: string, w: number, h: number) {
    this.url = url;
    this.data = document.createElement('video');
    this.data.width = w;
    this.data.height = h;
    this.data.autoplay = true;

    this.status = 'new';
  }

  // eslint-disable-next-line sonarjs/no-identical-functions
  load(cb: () => void) {
    this.data.setAttribute('src', this.url);
    this.data.addEventListener('loadeddata', () => {
      if (this.data.readyState >= 3) {
        cb();
      }
    });
  }

  get isLoaded() {
    return this.status === 'loaded';
  }
}

export class ImageAsset implements Asset {
  url: string;
  data: HTMLImageElement;
  status: 'new' | 'loaded';

  constructor(url: string) {
    this.url = url;
    this.data = new Image();
    this.status = 'new';
  }

  load(cb: () => void) {
    this.data.src = this.url;
    this.data.onload = cb;
  }

  get isLoaded() {
    return this.status === 'loaded';
  }
}

export class AssetsLoader {
  assets: Asset[];

  constructor(assets: Asset[]) {
    this.assets = assets;
  }

  load() {
    return new Promise<Asset[]>((res) => {
      let count = this.assets.length;
      const onLoad = () => {
        count = count - 1;
        if (count === 0) {
          res(this.assets);
        }
      };
      this.assets.forEach((image) => image.load(onLoad));
    });
  }
}
