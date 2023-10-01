import { Chapter } from '@/entities/site/chapter';
import { Curves } from '@/pages/chapter_4/curves';
import { Gradient } from '@/pages/chapter_4/gradient';
import { Images } from '@/pages/chapter_4/image';
import { Line } from '@/pages/chapter_4/line';
import { MultiCurves } from '@/pages/chapter_4/multi_curve';
import { Pixel } from '@/pages/chapter_4/pixel';
import { Shapes } from '@/pages/chapter_4/shapes';

export const chapter_4 = new Chapter('chapter_4', [
  Pixel,
  Images,
  Gradient,
  Shapes,
  MultiCurves,
  Curves,
  Line,
]);
