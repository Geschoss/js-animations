import './style.css';

import { createSite } from './common/core';
import { chapter_3 } from './chapters/chapter_3';
import { chapter_2 } from './chapters/chapter_2';
import { chapter_4 } from './chapters/chapter_4';

createSite([chapter_4, chapter_3, chapter_2]);
