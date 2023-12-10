import { Chapter } from 'src/entities/site/chapter';
import { DungeonCrawl } from 'src/pages/simple_2d_games/dungeon_crawl';
import { FlappyBird } from 'src/pages/simple_2d_games/flappy_bird';
import { SpacesShip } from 'src/pages/simple_2d_games/spacesship';

export const simple_2d_games = new Chapter('simple_2d_games', [
  FlappyBird,
  SpacesShip,
  DungeonCrawl,
]);
