import { Chapter } from '../../common/module';
import { accelerationModule } from './acceleration';
import { mouse_1Module } from './mouse_2';
import { spacesshipModule } from './spacesship';

export const chapter_5: Chapter = {
  name: 'chapter 5',
  expamples: [
    spacesshipModule,
    mouse_1Module,
    accelerationModule,
  ],
};
