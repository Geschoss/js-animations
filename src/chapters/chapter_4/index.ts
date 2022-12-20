import { Chapter } from '../../common/module';
import { curvesModule } from './curves';
import { gradientModule } from './gradient';
import { imageModule } from './image';
import { lineModule } from './line';
import { multiCurvesModule } from './multi_curve';
import { pixelModule } from './pixel';
import { shapesModule } from './shapes';

export const chapter_4: Chapter = {
  name: 'chapter 4',
  expamples: [
    pixelModule,
    imageModule,
    gradientModule,
    shapesModule,
    multiCurvesModule,
    curvesModule,
    lineModule,
  ],
};
