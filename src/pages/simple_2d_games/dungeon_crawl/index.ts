import { Point } from '../../../entities/engine/2d/entities';
import { Camera } from './camera';
import { DungeonMap } from './map';
import { MapBuilder } from './map_builder';
import { Player } from './player';
import { TilesE } from './tiles';
import { Engine2D } from '@/entities/engine/2d/engine';

const POSITION_SIZE = 24;

import floor_tiles from './floor_tiles.png';

type State = {
  map: DungeonMap;
  tiles: TilesE;
  camera: Camera;
  player: Player;
};
const game: State = {
  map: null,
  camera: null,
  player: null,
  tiles: null,
};

export class DungeonCrawl {
  static id = 'dungeonCrawl';

  game2D: Engine2D;

  constructor() {
    this.game2D = new Engine2D();
    const { env } = this.game2D;

    const tile_dimensions = {
      x: POSITION_SIZE,
      y: POSITION_SIZE,
    };
    game.tiles = TilesE.create({ tile_dimensions }, floor_tiles, 32);

    let map_builder = MapBuilder.create(game.tiles, 100, 100);
    game.map = map_builder.map;
    game.player = Player.create(
      game.tiles,
      map_builder.player_start.x,
      map_builder.player_start.y,
      Point.create(env.width / 2, env.height / 2)
    );

    this.game2D.tick((ctx, _, keyboard) => {
      if (game.tiles.isReady()) {
        game.player.update(game.map, keyboard);
        game.map.render(ctx, game.player, { ...env, tile_dimensions });
        game.player.render(ctx);
      }
    });
  }

  destroy() {
    this.game2D.destroy();

    this.game2D = undefined;
  }
}
