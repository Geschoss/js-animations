import { Chapter, Module } from './module';
import { initDOM } from './dom';
import { getSearchParams, getSelectedChapter, getSelectedExample } from './url';
import { findCurrentModule } from './utils';

type Inited = {
  inited?: boolean;
};
export function createSite(chaptersArr: Chapter[]) {
  const chapters = chaptersArr.reduce(
    (acc, value) => ({ ...acc, [value.name]: value }),
    {}
  );
  const DOM = initDOM();
  const queryParams = getSearchParams();
  const ctx = DOM.canvas.getContext('2d');

  let currentChapter = getSelectedChapter(queryParams.chapter, chapters);
  let currentExample: Module & Inited;
  let animationCbId: number;
  let clear = true;

  DOM.updateChaptersMenu(chapters, currentChapter, selectChapter);

  function selectChapter(chapterName: string) {
    destroyModule();

    currentChapter = chapters[chapterName];
    currentExample = getSelectedExample(queryParams.example, currentChapter);

    DOM.updateExamplesMenu(currentChapter, currentExample, selectExample);

    initModule();
  }

  function selectExample(exampleName: string) {
    destroyModule();

    currentExample = findCurrentModule(exampleName, currentChapter);

    initModule();
  }

  function destroyModule() {
    if (animationCbId) {
      cancelAnimationFrame(animationCbId);
    }
    if (currentExample && currentExample.inited) {
      currentExample.destroy(DOM.canvas);
    }
  }

  function initModule() {
    clear = true;
    let env = {
      width: currentExample.settings.width || DOM.body.offsetWidth,
      height: currentExample.settings.height || DOM.body.offsetHeight,
    };

    DOM.canvas.width = env.width;
    DOM.canvas.height = env.height;
    currentExample.init(DOM.canvas, env);
    currentExample.inited = true;
    render();
  }

  function render() {
    if (clear) {
      ctx.clearRect(0, 0, DOM.canvas.width, DOM.canvas.height);
    }
    let env = {
      width: DOM.canvas.width,
      height: DOM.canvas.height,
    };
    let result = currentExample.render(ctx, env);

    if (typeof result === 'boolean') {
      clear = result;
    }
    animationCbId = requestAnimationFrame(render);
  }
}
