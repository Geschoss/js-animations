export class Resize {
  cb: (w: number, h: number) => void;
  resizeFn: () => void;

  constructor(node: HTMLElement = document.body) {
    this.cb = () => {};
    this.resizeFn = () => {
      const { offsetWidth, offsetHeight } = node;
      this.cb(offsetWidth, offsetHeight);
    };
    window.addEventListener('resize', this.resizeFn);
  }

  changed(cb: (w: number, h: number) => void) {
    this.cb = cb;
  }

  destroy() {
    this.cb = undefined;
    window.removeEventListener('resize', this.resizeFn);
    this.resizeFn = undefined;
  }
}