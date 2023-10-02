import { Chapter } from '@/entities/site/chapter';
import { Balls } from '@/pages/simple_examples/examples/chapter_2/ball/balls';
import { Balls2 } from '@/pages/simple_examples/examples/chapter_2/ball/balls_2';
import { BallTouch } from '@/pages/simple_examples/examples/chapter_2/ball/balls_touch';
import { Pidor } from '@/pages/simple_examples/examples/chapter_2/ball/p_dor';
import { Arrow } from '@/pages/simple_examples/examples/chapter_3/trigonometry/arrow';
import { Distance } from '@/pages/simple_examples/examples/chapter_3/trigonometry/distance';
import { Liner } from '@/pages/simple_examples/examples/chapter_3/trigonometry/liner';
import { Circle } from '@/pages/simple_examples/examples/chapter_3/trigonometry/random';
import { Waves } from '@/pages/simple_examples/examples/chapter_3/trigonometry/waves';
import { Curves } from '@/pages/simple_examples/examples/chapter_4/curves';
import { Gradient } from '@/pages/simple_examples/examples/chapter_4/gradient';
import { Images } from '@/pages/simple_examples/examples/chapter_4/image';
import { Line } from '@/pages/simple_examples/examples/chapter_4/line';
import { MultiCurves } from '@/pages/simple_examples/examples/chapter_4/multi_curve';
import { Pixel } from '@/pages/simple_examples/examples/chapter_4/pixel';
import { Shapes } from '@/pages/simple_examples/examples/chapter_4/shapes';
import { Acceleration } from '@/pages/simple_examples/examples/chapter_5/acceleration';
import { Mouse1 } from '@/pages/simple_examples/examples/chapter_5/mouse_2';
import { Removal } from '@/pages/simple_examples/examples/removal';

export const simple_examples = new Chapter('simple_examples', [
  Removal,
  Mouse1,
  Acceleration,
  Pixel,
  Images,
  Gradient,
  Shapes,
  MultiCurves,
  Curves,
  Line,
  Distance,
  Circle,
  Liner,
  Waves,
  Arrow,
  Balls,
  Balls2,
  BallTouch,
  Pidor,
]);
