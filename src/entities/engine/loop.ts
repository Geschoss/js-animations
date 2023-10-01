export class Loop {
  private destroyed: boolean = false;
  private cb: (time: DOMHighResTimeStamp) => void;
  private animationCbId: number | null;

  tick(cb: (time: DOMHighResTimeStamp) => void) {
    this.cb = cb;

    const loop = (time: DOMHighResTimeStamp) => {
      if (this.cb || !this.destroyed) {
        this.cb(time);
        this.animationCbId = requestAnimationFrame(loop);
      }
    };
    loop(0);
  }

  destroy() {
    this.destroyed = true;
    if (this.animationCbId) {
      cancelAnimationFrame(this.animationCbId);
    }
  }
}
