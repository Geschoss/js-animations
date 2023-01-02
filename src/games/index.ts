import { Chapter } from '../common/module';
import { flappyBirdModule } from './flappy_bird';
import { spacesshipGame } from './spacesship';

export const games: Chapter = {
  name: 'games',
  expamples: [flappyBirdModule, spacesshipGame],
};
