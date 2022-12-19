import { Chapter } from '../../common/module';
import { curvesModule } from './curves';
import { lineModule } from './line';
import { multiCurvesModule } from './multi_curve';
import { shapesModule } from './shapes';

export const chapter_4: Chapter = {
  name: 'chapter 4',
  expamples: [shapesModule, multiCurvesModule, curvesModule, lineModule],
};
