import { Chapter } from '@/entities/site/chapter';
import { Module } from '@/entities/site/module';

export class Dom {
  chapters: HTMLElement;
  examples: HTMLElement;

  constructor(document: Document) {
    this.chapters = document.getElementById('chapters_menu');
    this.examples = document.getElementById('examples_menu');
  }

  updateModuleMenu(
    currentChapter: Chapter,
    currentModule: { name: string; module: Module },
    selectModule: (exampleName: string) => void
  ) {
    this.removeChildren(this.examples);

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
        selectModule(module.name);
      });
      this.examples.appendChild(div);
    });
  }

  updateChaptersMenu(
    chapters: Record<string, Chapter>,
    currentChapter: Chapter,
    selectChapter: (chapterName: string) => void
  ) {
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
        selectChapter(chapterName);
      });

      this.chapters.appendChild(div);
    });
    selectChapter(currentChapter.name);
  }

  private removeChildren(parent: HTMLElement) {
    while (parent.lastChild) {
      parent.removeChild(parent.lastChild);
    }
  }
}
