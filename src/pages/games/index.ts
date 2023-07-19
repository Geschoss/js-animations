import { Chapter } from '../../common/module';
import { dungeonCrawlModule } from './dungeon_crawl';
import { flappyBirdModule } from './flappy_bird';
import { spacesshipGame } from './spacesship';

export const games: Chapter = {
  name: 'games',
  expamples: [
    spacesshipGame,
    flappyBirdModule,
    dungeonCrawlModule,
  ],
};
