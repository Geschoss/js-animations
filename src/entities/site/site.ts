import { Dom } from '@/entities/site/dom';
import { Chapter } from '@/entities/site/chapter';
import { Module, ModuleConstructor } from '@/entities/site/module';
import { Routing } from '@/entities/site/routing';

export class Site {
  chaptersMap: Record<string, Chapter>;

  currentChapter: Chapter;
  currentModule: {
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

    this.dom = new Dom(document);
    this.routing = new Routing();

    this.currentChapter = this.getSelectedChapter(this.routing.chapter);

    this.dom.updateChaptersMenu(
      this.chaptersMap,
      this.currentChapter,
      this.selectChapter.bind(this)
    );
  }

  selectChapter(chapterName: string) {
    if (this.currentModule) {
      this.currentModule.module.destroy();
      this.currentModule = undefined;
    }

    this.currentChapter = this.chaptersMap[chapterName];
    this.routing.setChapter(this.currentChapter.name);

    const mod = this.getSelectedModule(
      this.routing.module,
      this.currentChapter
    );

    if (mod) {
      this.setModule(mod);
    }

    this.dom.updateModuleMenu(
      this.currentChapter,
      this.currentModule,
      this.selectModule.bind(this)
    );
  }

  selectModule(moduleName: string) {
    if (this.currentModule) {
      this.currentModule.module.destroy();
      this.currentModule = undefined;
    }

    const mod = this.currentChapter.modules.find(({ id }) => id === moduleName);

    if (mod) {
      this.setModule(mod);
    }
  }

  private setModule(mod: ModuleConstructor) {
    this.routing.setModule(mod.id);
    this.currentModule = {
      id: mod.id,
      module: new mod(),
    };
  }

  private getSelectedChapter(chapterName: string) {
    let current = this.chaptersMap[chapterName];
    if (current == undefined) {
      return Object.values(this.chaptersMap)[0]; // TODO костыль
    }
    return current;
  }

  private getSelectedModule(exampleName: string, chapter: Chapter) {
    let current = chapter.modules.find(({ id }) => id === exampleName);
    if (current == undefined) {
      return chapter.modules[0]; // TODO костыль
    }
    return current;
  }
}
