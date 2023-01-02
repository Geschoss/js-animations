import { Chapter, Module } from './module';
import { setSearchParam } from './url';

export const initDOM = () => {
  let dom = {
    chapters: document.getElementById('chapters_menu'),
    examples: document.getElementById('examples_menu'),
    canvas: document.getElementById('canvas') as HTMLCanvasElement,
    body: document.body,
  };
  return {
    ...dom,
    onResize: onResize(),
    updateExamplesMenu: updateExamplesMenu(dom.examples),
    updateChaptersMenu: updateChaptersMenu(dom.chapters),
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
    currentChapter: Chapter,
    currentExample: Module,
    selectExample: (exampleName: string) => void
  ) => {
    removeChildren(node);
    let selected: HTMLDivElement;
    currentChapter.expamples.forEach((module) => {
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

function updateChaptersMenu(node: HTMLElement) {
  return (
    chapters: Record<string, Chapter>,
    currentChapter: Chapter,
    selectChapter: (chapterName: string) => void
  ) => {
    let selected: HTMLDivElement;
    Object.keys(chapters).forEach((chapterName) => {
      let instance = chapters[chapterName];

      let div = document.createElement('div');
      div.classList.add('menu__item');
      div.innerText = instance.name;

      if (currentChapter === instance) {
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
        selectChapter(chapterName);
      });

      node.appendChild(div);
    });
    selectChapter(currentChapter.name);
  };
}

function removeChildren(parent: HTMLElement) {
  while (parent.lastChild) {
    parent.removeChild(parent.lastChild);
  }
}
