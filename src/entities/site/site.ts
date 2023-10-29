import { Dom } from '@/entities/site/dom';
import { Chapter } from '@/entities/site/chapter';
import { Module } from '@/entities/site/module';
import { Routing } from '@/entities/site/routing';

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
      if (Object.hasOwn(acc, chapter.name)) {
        throw new Error(`Chapter ${chapter.name} alredy has in list!`);
      }
      return { ...acc, [chapter.name]: chapter };
    }, {});

    this.routing = new Routing(() => {
      if (this.currentChapter?.name !== this.routing.chapter) {
        this.chapterChanged();
      } else if (this.currentModule?.id !== this.routing.module) {
        this.moduleChanged();
      }
    });

    this.dom = new Dom(document, this.routing);

    this.initCurrentChapter();

    this.dom.renderChaptersMenu(this.chaptersMap, this.currentChapter);
    this.dom.renderModuleMenu(this.currentChapter, this.currentModule);
  }

  private chapterChanged() {
    if (this.currentModule) {
      this.currentModule.module.destroy();
      this.currentModule = undefined;
    }

    this.currentChapter = this.chapterByName();
    this.moduleChanged();
  }

  moduleChanged() {
    if (this.currentModule) {
      this.currentModule.module.destroy();
      this.currentModule = undefined;
    }

    let module;
    if (this.currentChapter) {
      module = this.moduleByName();
    }
    if (module) {
      this.currentModule = {
        id: module.id,
        module: new module(),
      };
    }

    this.dom.renderModuleMenu(this.currentChapter, this.currentModule);
  }

  private initCurrentChapter() {
    this.currentChapter = this.chapterByName();
    let module;
    if (this.currentChapter) {
      module = this.moduleByName();
    }
    if (module) {
      this.currentModule = {
        id: module.id,
        module: new module(),
      };
    }
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
