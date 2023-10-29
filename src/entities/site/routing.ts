export class Routing {
  module: string;
  chapter: string;
  onChange: () => void;

  constructor(onChange: () => void) {
    const { module, chapter } = this.getSearchParam();

    this.module = module;
    this.chapter = chapter;
    this.onChange = onChange;

    window.addEventListener('popstate', () => this.onUrlChanged(), false);
  }

  setModule(moduleName: string) {
    this.setSearchParam('module', moduleName);
    this.onUrlChanged();
  }

  setChapter(chapterName: string) {
    this.setSearchParam('chapter', chapterName);
    this.onUrlChanged();
  }

  private onUrlChanged() {
    const { module, chapter } = this.getSearchParam();
    this.module = module;
    this.chapter = chapter;
    this.onChange();
  }

  private getSearchParam() {
    let searchParams = new URLSearchParams(window.location.search);

    return {
      module: searchParams.get('module') || '',
      chapter: searchParams.get('chapter') || '',
    };
  }
  private setSearchParam(name: string, value: string) {
    let url = new URL(window.location.href);
    url.searchParams.set(name, value);
    window.history.pushState('Animations', name, url);
  }
}
