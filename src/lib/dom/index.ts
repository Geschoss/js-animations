function domById<T extends HTMLElement>(elementId: string) {
  const element = document.getElementById('chapters_menu') as T;
  if (element === null) {
    throw new Error(`HTMLElement ${elementId} didn't find`);
  }
  return element;
}

export const initDOM = () => {
  const pages = domById('chapters_menu');
  const canvas = domById<HTMLCanvasElement>('canvas');
  const examples = domById('examples_menu');

  return {
    pages,
    canvas,
    examples,
    body: document.body,
    onResize: onResize(),
    updatePagesMenu: updatePagesMenu(pages),
    updateExamplesMenu: updateExamplesMenu(examples),
  };
};

function onResize() {
  return (cb: () => void) => {
    window.addEventListener('resize', () => {
      cb();
    });
  };
}

function updateExamplesMenu(node: HTMLElement) {
  return (
    currentPage: Page,
    currentExample: Module,
    selectExample: (exampleName: string) => void
  ) => {
    removeChildren(node);
    let selected: HTMLDivElement;
    currentPage.expamples.forEach((module) => {
      let div = document.createElement('div');
      div.classList.add('menu__item');
      div.innerText = module.settings.name;

      if (currentExample === module) {
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
        setSearchParam('example', module.settings.name);
        selectExample(module.settings.name);
      });
      node.appendChild(div);
    });
  };
}

function updatePagesMenu(node: HTMLElement) {
  return (
    pages: Record<string, Page>,
    currentPage: Page,
    selectPage: (chapterName: string) => void
  ) => {
    let selected: HTMLDivElement;
    Object.keys(pages).forEach((chapterName) => {
      let instance = pages[chapterName];

      let div = document.createElement('div');
      div.classList.add('menu__item');
      div.innerText = instance.name;

      if (currentPage === instance) {
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
        setSearchParam('chapter', chapterName);
        selectPage(chapterName);
      });

      node.appendChild(div);
    });
    selectPage(currentPage.name);
  };
}

function removeChildren(parent: HTMLElement) {
  while (parent.lastChild) {
    parent.removeChild(parent.lastChild);
  }
}
