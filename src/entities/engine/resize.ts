type CB = (w: number, h: number) => void;
export class Resize {
  cb?: CB;
  subs?: Array<CB>;
  resizeFn?: () => void;

  constructor(node: HTMLElement = document.body) {
    this.subs = [];
    this.cb = () => {};
    this.resizeFn = () => {
      const { offsetWidth, offsetHeight } = node;
      if (this.cb) {
        this.cb(offsetWidth, offsetHeight);
      }
      this.subs?.forEach((sub) => {
        sub(offsetWidth, offsetHeight);
      });
    };
    window.addEventListener('resize', this.resizeFn);
  }

  changed(cb: CB) {
    this.cb = cb;
  }

  onChanged(cb: CB) {
    this.subs?.push(cb);
  }

  destroy() {
    this.cb = undefined;
    this.subs = undefined;
    if (this.resizeFn) {
      window.removeEventListener('resize', this.resizeFn);
    }
    this.resizeFn = undefined;
  }
}
