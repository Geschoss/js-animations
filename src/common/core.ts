import { Chapter, Env, Module } from './module';
import { initDOM } from './dom';
import { getSearchParams, getSelectedChapter, getSelectedExample } from './url';
import { findCurrentModule } from './utils';
import { isNil, values } from '../lib';

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
  let cleanupFn: () => void;
  let defaultEnv = {
    width: DOM.body.offsetWidth,
    height: DOM.body.offsetHeight,
    injectors: {},
  };
  let env: Env = defaultEnv;

  DOM.updateChaptersMenu(chapters, currentChapter, selectChapter);
  DOM.onResize(() => {
    env = {
      ...env,
      width: currentExample.settings.width || DOM.body.offsetWidth,
      height: currentExample.settings.height || DOM.body.offsetHeight,
      tile_dimensions: currentExample.settings.tile_dimensions,
    };

    DOM.canvas.width = env.width;
    DOM.canvas.height = env.height;

    if (currentExample.resize) {
      currentExample.resize(ctx, env);
    }
  });

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

  function initModule() {
    if (currentExample.inited) {
      return;
    }

    let injectors =
      currentExample.settings.injectors?.reduce((acc, injector) => {
        return {
          ...acc,
          [injector.name]: createInjector(injector, { canvas: DOM.canvas }),
        };
      }, {}) || {};

    env = {
      width: currentExample.settings.width || DOM.body.offsetWidth,
      height: currentExample.settings.height || DOM.body.offsetHeight,
      tile_dimensions: currentExample.settings.tile_dimensions,
      injectors,
    };

    DOM.canvas.width = env.width;
    DOM.canvas.height = env.height;

    currentExample.init(DOM.canvas, env, ctx);
    currentExample.inited = true;
    render(0);
  }

  function render(time: DOMHighResTimeStamp) {
    if (!isNil(cleanupFn)) {
      cleanupFn();
    } else {
      cleanupDefaultFn();
    }

    cleanupFn = currentExample.render(ctx, env, time) || null;
    animationCbId = requestAnimationFrame(render);
  }

  function destroyModule() {
    if (animationCbId) {
      cancelAnimationFrame(animationCbId);
    }
    if (currentExample && currentExample.inited) {
      if (!isNil(env.injectors)) {
        values(env.injectors).map((injector) => injector.destroy());
      }
      currentExample.destroy(DOM.canvas);
      currentExample.inited = false;
    }
    env = defaultEnv;
  }

  function cleanupDefaultFn() {
    ctx.clearRect(0, 0, DOM.canvas.width, DOM.canvas.height);
  }
}

function createInjector(injector, deps) {
  let args = injector.deps.map(({ name }) => {
    let dep = deps[name];
    if (isNil(dep)) {
      throw new Error(`${injector.name} has unknow dep ${name}`);
    }
    return dep;
  });
  return new injector.instance(...args);
}
