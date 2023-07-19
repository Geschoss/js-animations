import './style.css';

import { createSite } from './common/core';
import { games } from './pages/games';
import { chapter_3 } from './pages/chapter_3';
import { chapter_2 } from './pages/chapter_2';
import { chapter_4 } from './pages/chapter_4';
import { chapter_5 } from './pages/chapter_5';
import { chapter_6 } from './pages/chapter_6';

createSite([games, chapter_6, chapter_5, chapter_4, chapter_3, chapter_2]);
