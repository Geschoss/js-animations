import { Module } from './module';

export function createSite(modulesArray: Module[]) {
  const modules = modulesArray.reduce(
    (acc, value) => ({ ...acc, [value.settings.name]: value }),
    {}
  );

  const menuNode = document.getElementById('menu');
  const canvas = document.getElementById('canvas') as HTMLCanvasElement;
  const body = document.body;
  const ctx = canvas.getContext('2d');

  let currentPage = initCurrentPage();
  let curren = initCurrentMosule(currentPage, modules);
  let animationCbId: number;

  createMenu(modules, menuNode, selectModule, curren);

  initModule();

  function initModule() {
    let env = {
      width: curren.settings.width || body.offsetWidth,
      height: curren.settings.height || body.offsetHeight,
    };

    canvas.width = env.width;
    canvas.height = env.height;
    curren.init(canvas, env);
    render();
  }

  function selectModule(moduleName: string) {
    if (animationCbId) {
      cancelAnimationFrame(animationCbId);
    }
    if (curren) {
      curren.destroy(canvas);
    }
    curren = modules[moduleName];

    initModule();
  }

  function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let env = {
      width: canvas.width,
      height: canvas.height,
    };
    curren.render(ctx, env);
    animationCbId = requestAnimationFrame(render);
  }
}
function initCurrentMosule(pageName: string, modules: Record<string, Module>) {
  let current = modules[pageName];
  if (pageName === '' || current == undefined) {
    return Object.values(modules)[0]; // TODO костыль
  }
  return current;
}

function initCurrentPage() {
  return window.location.hash.slice(1) || '';
}

function changeUrl(moduleName: string) {
  window.history.pushState({}, moduleName, `#${moduleName}`);
}

function createMenu(
  modules: Record<string, Module>,
  menuNode: HTMLElement,
  selectModule,
  curren: Module
) {
  let selected: HTMLDivElement;
  Object.keys(modules).map((moduleName) => {
    let instance = modules[moduleName];

    let div = document.createElement('div');
    div.classList.add('menu__item');
    div.innerText = instance.settings.name;

    if (curren === instance) {
      selected = div;
      selected.classList.add('menu__item_selected');
    }

    div.addEventListener('click', () => {
      if (selected === div) {
        return;
      }
      if (selected) {
        selected.classList.remove('menu__item_selected');
      }
      selected = div;
      selected.classList.add('menu__item_selected');
      changeUrl(moduleName);
      selectModule(moduleName);
    });

    menuNode.appendChild(div);
    return div;
  });
}
