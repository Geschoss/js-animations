import { Chapter } from 'src/entities/site/chapter';
import { Balls } from 'src/pages/simple_examples/examples/chapter_2/ball/balls';
import { Balls2 } from 'src/pages/simple_examples/examples/chapter_2/ball/balls_2';
import { BallTouch } from 'src/pages/simple_examples/examples/chapter_2/ball/balls_touch';
import { Pidor } from 'src/pages/simple_examples/examples/chapter_2/ball/p_dor';
import { Arrow } from 'src/pages/simple_examples/examples/chapter_3/trigonometry/arrow';
import { Distance } from 'src/pages/simple_examples/examples/chapter_3/trigonometry/distance';
import { Liner } from 'src/pages/simple_examples/examples/chapter_3/trigonometry/liner';
import { Circle } from 'src/pages/simple_examples/examples/chapter_3/trigonometry/random';
import { Waves } from 'src/pages/simple_examples/examples/chapter_3/trigonometry/waves';
import { Curves } from 'src/pages/simple_examples/examples/chapter_4/curves';
import { Gradient } from 'src/pages/simple_examples/examples/chapter_4/gradient';
import { Images } from 'src/pages/simple_examples/examples/chapter_4/image';
import { Line } from 'src/pages/simple_examples/examples/chapter_4/line';
import { MultiCurves } from 'src/pages/simple_examples/examples/chapter_4/multi_curve';
import { Pixel } from 'src/pages/simple_examples/examples/chapter_4/pixel';
import { Shapes } from 'src/pages/simple_examples/examples/chapter_4/shapes';
import { Acceleration } from 'src/pages/simple_examples/examples/chapter_5/acceleration';
import { Mouse1 } from 'src/pages/simple_examples/examples/chapter_5/mouse_2';
import { Bundaries } from 'src/pages/simple_examples/examples/chapter_6/boundaties';
import { Removal } from 'src/pages/simple_examples/examples/chapter_6/removal';

export const simple_examples = new Chapter('simple_examples', [
  Bundaries,
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
