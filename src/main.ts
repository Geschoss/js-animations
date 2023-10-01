import './style.css';

import { chapter_3 } from './pages/chapter_3';
import { chapter_2 } from './pages/chapter_2';
import { Site } from '@/entities/site/site';
import { chapter_4 } from '@/pages/chapter_4';

new Site([chapter_4, chapter_3, chapter_2]);
