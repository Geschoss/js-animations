import { Chapter } from '@/entities/site/chapter';
import { Balls } from '@/pages/chapter_2/ball/balls';
import { Balls2 } from '@/pages/chapter_2/ball/balls_2';
import { BallTouch } from '@/pages/chapter_2/ball/balls_touch';
import { Pidor } from '@/pages/chapter_2/ball/p_dor';

export const chapter_2 = new Chapter('chapter_2', [
  Balls,
  Balls2,
  BallTouch,
  Pidor,
]);
