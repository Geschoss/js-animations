import { Point } from '../../common/entities';
import { KeyboardInjector } from '../../common/io';
import { Module } from '../../common/module';
import { Camera } from './camera';
import { DungeonMap } from './map';
import { MapBuilder } from './map_builder';
import { Player } from './player';

const POSITION_SIZE = 24;

type State = {
  map: DungeonMap;
  camera: Camera;
  player: Player;
};
const game: State = {
  map: null,
  camera: null,
  player: null,
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
    let map_builder = MapBuilder.create(100, 100);
    game.map = map_builder.map;
    game.player = Player.create(
      map_builder.player_start.x,
      map_builder.player_start.y,
      Point.create(env.width / 2, env.height / 2)
    );
  },
  render(ctx, env) {
    game.player.update(game.map, env);
    game.map.render(ctx, game.player, env);
    game.player.render(ctx, env);
  },
  resize(_, env) {
    let map_builder = MapBuilder.create(100, 100);
    game.map = map_builder.map;
    game.player = Player.create(
      map_builder.player_start.x,
      map_builder.player_start.y,
      Point.create(env.width / 2, env.height / 2)
    );
  },
  destroy() {},
};
