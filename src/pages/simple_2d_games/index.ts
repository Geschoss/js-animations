import { Chapter } from '@/entities/site/chapter';
import { DungeonCrawl } from '@/pages/simple_2d_games/dungeon_crawl';
import { FlappyBird } from '@/pages/simple_2d_games/flappy_bird';
import { SpacesShip } from '@/pages/simple_2d_games/spacesship';

export const simple_2d_games = new Chapter('simple_2d_games', [
  FlappyBird,
  SpacesShip,
  DungeonCrawl,
]);
