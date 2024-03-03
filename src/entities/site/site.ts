import { Chapter } from 'src/entities/site/chapter';
import { Dom } from 'src/entities/site/dom';
import { Module } from 'src/entities/site/module';
import { Routing } from 'src/entities/site/routing';
import { hasOwn } from 'src/shared/lib/object';

export class Site {
  chaptersMap: Record<string, Chapter>;

  currentChapter?: Chapter;
  currentModule?: {
    id: string;
    module: Module;
  };

  dom: Dom;
  routing: Routing;

  constructor(chapters: Chapter[]) {
    this.chaptersMap = chapters.reduce((acc, chapter) => {
      if (hasOwn(acc, chapter.name)) {
        throw new Error(`Chapter ${chapter.name} alredy has in list!`);
      }
      return { ...acc, [chapter.name]: chapter };
    }, {});

    this.routing = new Routing();
    this.routing.onUrlChanged(() => {
      if (this.currentChapter?.name !== this.routing.chapter) {
        this.currentChapter = this.chapterByName();
      }
      this.moduleChanged();
    });

    this.dom = new Dom(document, this.routing);
    this.currentChapter = this.chapterByName();
    this.moduleChanged();

    this.dom.renderChaptersMenu(this.chaptersMap, this.currentChapter);
  }

  moduleChanged() {
    if (this.currentModule) {
      this.currentModule.module.destroy();
      this.currentModule = undefined;
    }

    if (!this.currentChapter) {
      return;
    }
    let module = this.moduleByName();
    if (module) {
      this.currentModule = {
        id: module.id,
        module: new module(),
      };
    }

    this.dom.renderModuleMenu(this.currentChapter, this.currentModule);
  }

  private chapterByName() {
    return this.chaptersMap[this.routing.chapter];
  }

  private moduleByName() {
    if (!this.currentChapter) {
      return undefined;
    }
    return this.currentChapter.modules.find(
      ({ id }) => id === this.routing.module
    );
  }
}
