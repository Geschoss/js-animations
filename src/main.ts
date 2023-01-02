import './style.css';

import { createSite } from './common/core';
import { games } from './games';
import { chapter_3 } from './chapters/chapter_3';
import { chapter_2 } from './chapters/chapter_2';
import { chapter_4 } from './chapters/chapter_4';
import { chapter_5 } from './chapters/chapter_5';
import { chapter_6 } from './chapters/chapter_6';

createSite([chapter_6, chapter_5, chapter_4, chapter_3, chapter_2, games]);
