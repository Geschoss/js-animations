import { Chapter } from '@/entities/site/chapter';
import { Module } from '@/entities/site/module';

export const initDOM = () => {
  let dom = {
    chapters: document.getElementById('chapters_menu'),
    examples: document.getElementById('examples_menu'),
  };
  return {
    ...dom,
    updateModuleMenu: updateModuleMenu(dom.examples),
    updateChaptersMenu: updateChaptersMenu(dom.chapters),
  };
};

function updateModuleMenu(node: HTMLElement) {
  return (
    currentChapter: Chapter,
    currentModule: Module,
    selectExample: (exampleName: string) => void
  ) => {
    removeChildren(node);
    let selected: HTMLDivElement;
    currentChapter.modules.forEach((module) => {
      let div = document.createElement('div');
      div.classList.add('menu__item');
      div.innerText = module.name;

      if (currentModule.name === module.name) {
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
        setSearchParam('module', module.name);
        selectExample(module.name);
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

export function setSearchParam(name: string, value: string) {
  let url = new URL(window.location.href);
  url.searchParams.set(name, value);
  window.history.pushState('Animations', name, url);
}
