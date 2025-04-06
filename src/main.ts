import './style.css';

import { Site } from 'src/entities/site/site';
import { simple_2d_games } from 'src/pages/simple_2d_games';
import { simple_examples } from 'src/pages/simple_examples';

// eslint-disable-next-line sonarjs/constructor-for-side-effects
new Site([simple_2d_games, simple_examples]);
