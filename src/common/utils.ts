import { Chapter } from './module';

export function findCurrentModule(exampleName: string, chapter: Chapter) {
  return chapter.expamples.find(
    ({ settings }) => settings.name === exampleName
  );
}
