import './style.css';

import { Site } from '@/entities/site/site';
import { simple_2d_games } from '@/pages/simple_2d_games';
import { simple_examples } from '@/pages/simple_examples';

new Site([simple_2d_games, simple_examples]);
