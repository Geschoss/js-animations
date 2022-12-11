import { Module } from '../../common/module';

function mousedown() {
  console.log('mousedown');
}
function mouseup() {
  console.log('mouseup');
}

export const helloModule: Module = {
  settings: {
    name: 'hello',
  },
  init(canvas) {
    canvas.addEventListener('mousedown', mousedown);
    canvas.addEventListener('mouseup', mouseup);
  },
  render() {},
  destroy(canvas) {
    canvas.removeEventListener('mousedown', mousedown);
    canvas.removeEventListener('mouseup', mouseup);
  },
};
