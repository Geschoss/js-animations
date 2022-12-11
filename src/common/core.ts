import { Module } from './module';

export function createSite(modules: Module[]) {
  const menuNode = document.getElementById('menu');
  const canvas = document.getElementById('canvas') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d');

  let curren: Module;
  let animationCbId: number;

  createMenu(modules, menuNode, selectModule);

  function selectModule(id: number) {
    if (animationCbId) {
      cancelAnimationFrame(animationCbId);
    }
    if (curren) {
      curren.destroy(canvas);
    }
    curren = modules[id];
    canvas.width = curren.settings.width || 700;
    canvas.height = curren.settings.height || 600;
    curren.init(canvas);
    render();
  }

  function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    curren.render(ctx);
    animationCbId = requestAnimationFrame(render);
  }
}

function createMenu(modules: Module[], menuNode: HTMLElement, selectModule) {
  let selected: HTMLDivElement;
  let itemNodes = modules.map((instance, i) => {
    let div = document.createElement('div');
    div.classList.add('menu__item');
    div.addEventListener('click', () => {
      if (selected === div) {
        return;
      }
      if (selected) {
        selected.classList.remove('menu__item_selected');
      }
      selected = div;
      selected.classList.add('menu__item_selected');
      selectModule(i);
    });
    div.innerText = instance.settings.name;
    menuNode.appendChild(div);
    return div;
  });
  selected = itemNodes[0];
  selected.classList.add('menu__item_selected');
  selectModule(0);
}
