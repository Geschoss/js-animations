import { Chapter } from './module';
import { findCurrentModule } from './utils';

export function setSearchParam(name: string, value: string) {
  let url = new URL(window.location.href);
  url.searchParams.set(name, value);
  window.history.pushState('Animations', name, url);
}

export function getSearchParams() {
  let searchParams = new URLSearchParams(window.location.search);
  return {
    chapter: searchParams.get('chapter') || '',
    example: searchParams.get('example') || '',
  };
}

export function getSelectedChapter(
  chapterName: string,
  chapters: Record<string, Chapter>
) {
  let current = chapters[chapterName];
  if (current == undefined) {
    return Object.values(chapters)[0]; // TODO костыль
  }
  return current;
}

export function getSelectedExample(exampleName: string, chapter: Chapter) {
  let current = findCurrentModule(exampleName, chapter);
  if (current == undefined) {
    return chapter.expamples[0]; // TODO костыль
  }
  return current;
}
