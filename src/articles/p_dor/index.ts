import { Module } from '../../common/module';

function mousedown() {
  console.log('mousedown');
}
function mouseup() {
  console.log('mouseup');
}

export const p_dorModule: Module = {
  settings: {
    name: 'p_dor',
  },
  init(canvas) {
    
    
  },
  render() {},
  destroy(canvas) {
    
  },
};
