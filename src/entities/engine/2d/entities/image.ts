export class ImageE {
  private raw: HTMLImageElement;
  private status: 'new' | 'ready' | 'error' = 'new';

  constructor(url: string) {
    this.raw = new Image();
    this.raw.src = url;
    this.raw.onload = () => {
      this.status = 'ready';
    };
    this.raw.onerror = (event) => {
      this.status = 'error';
      console.error(event);
    };
  }

  isReady() {
    return this.status === 'ready';
  }

  data() {
    return this.raw;
  }
}
