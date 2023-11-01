export class Menu {
  root: HTMLElement;
  chapters: HTMLElement;
  examples: HTMLElement;

  constructor(root: HTMLElement) {
    this.examples = this.renderExamplesMenu();
    this.chapters = this.renderChaptersMenu();
    this.root = this.renderRoot();
    root.appendChild(this.root);
  }

  private renderChaptersMenu() {
    let div = document.createElement('div');
    div.classList.add('menu__list');
    div.classList.add('menu__list_chapter');
    return div;
  }

  private renderExamplesMenu() {
    let div = document.createElement('div');
    div.classList.add('menu__list');
    return div;
  }

  private renderRoot() {
    let div = document.createElement('div');
    div.classList.add('menu__root');
    div.appendChild(this.chapters);
    div.appendChild(this.examples);
    return div;
  }
}
