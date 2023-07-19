import { Point } from '../../../common/entities';
import { KeyboardInjector } from '../../../common/io';
import { Module } from '../../../common/module';
import { Camera } from './camera';
import { DungeonMap } from './map';
import { MapBuilder } from './map_builder';
import { Player } from './player';
import { TilesE } from './tiles';

const POSITION_SIZE = 24;

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
export const dungeonCrawlModule: Module = {
  settings: {
    name: 'dungeon_crawl',
    injectors: [KeyboardInjector],
    tile_dimensions: {
      x: POSITION_SIZE,
      y: POSITION_SIZE,
    },
  },
  init(_, env) {
    game.tiles = TilesE.create(env, './floor_tiles.png', 32);

    let map_builder = MapBuilder.create(game.tiles, 100, 100);
    game.map = map_builder.map;
    game.player = Player.create(
      game.tiles,
      map_builder.player_start.x,
      map_builder.player_start.y,
      Point.create(env.width / 2, env.height / 2)
    );
  },
  render(ctx, env) {
    if (game.tiles.isReady()) {
      game.player.update(game.map, env);
      game.map.render(ctx, game.player, env);
      game.player.render(ctx);
    }
    return () => {
      ctx.fillRect(0, 0, env.width, env.height);
    }
  },
  resize(_, env) {
    // let map_builder = MapBuilder.create(100, 100);
    // game.map = map_builder.map;
    // game.player = Player.create(
    //   map_builder.player_start.x,
    //   map_builder.player_start.y,
    //   Point.create(env.width / 2, env.height / 2)
    // );
  },
  destroy() {},
};
