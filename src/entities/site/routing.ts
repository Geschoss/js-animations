export class Routing {
  module: string;
  chapter: string;

  constructor() {
    let searchParams = new URLSearchParams(window.location.search);

    this.chapter = searchParams.get('chapter') || '';
    this.module = searchParams.get('module') || '';
  }

  setModule(moduleName: string) {
    this.setSearchParam('module', moduleName);
  }

  setChapter(chapterName: string) {
    this.setSearchParam('chapter', chapterName);
  }

  private setSearchParam(name: string, value: string) {
    let url = new URL(window.location.href);
    url.searchParams.set(name, value);
    window.history.pushState('Animations', name, url);
  }
}
