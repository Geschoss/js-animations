export class Keyboard {
  constructor() {
    window.addEventListener('keydown', this.keydown, false);
    window.addEventListener('keyup', this.keyup, false);
  }
  destroy() {
    window.removeEventListener('keydown', this.keydown, false);
    window.removeEventListener('keyup', this.keyup, false);
  }

  keydown = (event: KeyboardEvent) => {
    console.log(event.code);
  };
  keyup = (event: KeyboardEvent) => {
    console.log(event.code);
  };
}
