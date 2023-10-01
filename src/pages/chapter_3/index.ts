import { Chapter } from '@/entities/site/chapter';
import { Arrow } from '@/pages/chapter_3/trigonometry/arrow';
import { Distance } from '@/pages/chapter_3/trigonometry/distance';
import { Liner } from '@/pages/chapter_3/trigonometry/liner';
import { Circle } from '@/pages/chapter_3/trigonometry/random';
import { Waves } from '@/pages/chapter_3/trigonometry/waves';

export const chapter_3 = new Chapter('chapter_3', [
  Distance,
  Circle,
  Liner,
  Waves,
  Arrow,
]);
