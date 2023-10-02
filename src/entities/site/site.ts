import { initDOM } from '@/entities/dom/dom';
import { Chapter } from '@/entities/site/chapter';
import { Module } from '@/entities/site/module';

export class Site {
  chaptersMap: Record<string, Chapter>;
  currentModule: Module;
  currentChapter: Chapter;

  queryParams: {
    module: string;
    chapter: string;
  };

  dom: ReturnType<typeof initDOM>;

  constructor(chapters: Chapter[]) {
    this.chaptersMap = chapters.reduce((acc, chapter) => {
      if (Object.hasOwn(acc, chapter.name)) {
        throw new Error(`Chapter ${chapter.name} alredy has in list!`);
      }
      return { ...acc, [chapter.name]: chapter };
    }, {});

    this.dom = initDOM();
    this.queryParams = getSearchParams();

    this.currentChapter = getSelectedChapter(
      this.queryParams.chapter,
      this.chaptersMap
    );

    this.dom.updateChaptersMenu(
      this.chaptersMap,
      this.currentChapter,
      this.selectChapter.bind(this)
    );
  }

  selectChapter(chapterName: string) {
    if (this.currentModule) {
      this.currentModule.destroy();
      this.currentModule = undefined;
    }

    this.currentChapter = this.chaptersMap[chapterName];
    const mod = getSelectedExample(
      this.queryParams.module,
      this.currentChapter
    );

    if (mod) {
      this.currentModule = new mod();
    }

    this.dom.updateModuleMenu(
      this.currentChapter,
      this.currentModule,
      this.selectModule.bind(this)
    );
  }

  selectModule(moduleName: string) {
    if (this.currentModule) {
      this.currentModule.destroy();
      this.currentModule = undefined;
    }

    const mod = this.currentChapter.modules.find(
      ({ name }) => name === moduleName
    );

    this.currentModule = new mod();
  }
}

function getSelectedChapter(
  chapterName: string,
  chapters: Record<string, Chapter>
) {
  let current = chapters[chapterName];
  if (current == undefined) {
    return Object.values(chapters)[0]; // TODO костыль
  }
  return current;
}

function getSelectedExample(exampleName: string, chapter: Chapter) {
  let current = chapter.modules.find(({ name }) => name === exampleName);
  if (current == undefined) {
    return chapter.modules[0]; // TODO костыль
  }
  return current;
}

function getSearchParams() {
  let searchParams = new URLSearchParams(window.location.search);
  return {
    chapter: searchParams.get('chapter') || '',
    module: searchParams.get('module') || '',
  };
}
