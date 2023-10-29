import { Chapter } from '@/entities/site/chapter';
import { Module } from '@/entities/site/module';
import { Routing } from '@/entities/site/routing';

export class Dom {
  routing: Routing;
  chapters: HTMLElement;
  examples: HTMLElement;

  constructor(document: Document, routing: Routing) {
    this.routing = routing;
    this.chapters = document.getElementById('chapters_menu');
    this.examples = document.getElementById('examples_menu');
  }

  renderChaptersMenu(
    chapters: Record<string, Chapter>,
    currentChapter: Chapter
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
        this.routing.setChapter(chapterName);
      });

      this.chapters.appendChild(div);
    });
  }

  renderModuleMenu(
    currentChapter?: Chapter,
    currentModule?: { id: string; module: Module }
  ) {
    this.removeChildren(this.examples);
    if (!currentChapter) {
      return;
    }

    let selected: HTMLDivElement;

    currentChapter.modules.forEach((module) => {
      let div = document.createElement('div');
      div.classList.add('menu__item');
      div.innerText = module.id;

      if (currentModule?.id === module.id) {
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
        this.routing.setModule(module.id);
      });
      this.examples.appendChild(div);
    });
  }

  private removeChildren(parent: HTMLElement) {
    while (parent.lastChild) {
      parent.removeChild(parent.lastChild);
    }
  }
}
